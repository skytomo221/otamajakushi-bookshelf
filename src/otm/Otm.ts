import Ajv, { JSONSchemaType } from 'ajv';
import { Json } from 'fp-ts/Json';

import { Word, wordScheme } from './Word';
import { Zpdic, zpdicScheme } from './Zpdic';
import { ZpdicOnline, zpdicOnlineScheme } from './ZpdicOnline';

export const initOtm = {
  words: [],
  zpdic: {
    alphabetOrder: '',
    wordOrderType: 'UNICODE',
    punctuations: [',', '、'],
    ignoredTranslationRegex: '',
    pronunciationTitle: null,
    plainInformationTitles: [],
    informationTitleOrder: null,
    formFontFamily: null,
    defaultWord: {
      entry: {
        id: -1,
        form: '',
      },
      translations: [],
      tags: [],
      contents: [],
      variations: [],
      relations: [],
    },
  },
  snoj: null,
};

function* defaultIdIterator(): Generator<number> {
  let id = 0;
  while (true) {
    yield (id += 1);
  }
}

export class Otm {
  private otm: PlainOtm = initOtm;

  public readonly path: null | string;

  private wrapperIdGenerator: Generator<number> = defaultIdIterator();

  constructor(plain?: PlainOtm, path?: string) {
    if (plain) this.otm = plain;
    this.path = path ?? null;
    this.idGenerator = defaultIdIterator();
  }

  public static fromPlain(plain: PlainOtm): Otm {
    return new Otm(plain);
  }

  public toPlain(): PlainOtm {
    return this.otm;
  }

  fromString(json: string): Otm {
    const ajv = new Ajv();
    const plainOtm = JSON.parse(json);
    const valid = ajv.validate(plainOtmScheme, plainOtm);
    if (!valid) {
      throw new Error(ajv.errorsText());
    }
    this.otm = plainOtm;
    return this;
  }

  set idGenerator(generator: Generator<number>) {
    function* wrapper(otmc: Otm) {
      let nextId: number = generator.next().value;
      while (true) {
        const duplicate = (id: number): boolean =>
          otmc.otm.words.some(word => word.entry.id === id);
        while (duplicate(nextId)) {
          nextId = generator.next().value;
        }
        yield nextId;
      }
    }
    this.wrapperIdGenerator = wrapper(this);
  }

  setIdGenerator(generator: Generator<number>): Otm {
    this.idGenerator = generator;
    return this;
  }

  get stringify(): string {
    return JSON.stringify(this.otm);
  }

  addWord(
    word: (
      id: number,
    ) => Partial<
      Omit<Word, 'entry'> & { entry: { id?: number; form: string } }
    >,
  ): Otm {
    const nextId = this.wrapperIdGenerator.next().value;
    const newWord = word(nextId);
    this.otm = {
      ...this.otm,
      words: [
        ...this.otm.words,
        {
          entry: {
            id: newWord.entry?.id ?? nextId,
            form: newWord.entry?.form ?? '',
          },
          translations: newWord.translations ?? [],
          tags: newWord.tags ?? [],
          contents: newWord.contents ?? [],
          variations: newWord.variations ?? [],
          relations: newWord.relations ?? [],
        },
      ],
    };
    return this;
  }

  removeWord(id: number): Otm {
    this.otm = {
      ...this.otm,
      words: this.otm.words.filter(word => word.entry.id !== id),
    };
    return this;
  }

  updateWord({
    filter,
    map,
  }: {
    filter: (word: Word) => boolean;
    map: (word: Word) => Partial<Omit<Word, 'entry'>> & {
      entry: { form?: string };
    };
  }): Otm {
    this.otm = {
      ...this.otm,
      words: this.otm.words.map(word => {
        const newWord = map(word);
        return filter(word)
          ? {
              ...word,
              ...newWord,
              entry: {
                id: word.entry.id,
                form: newWord.entry.form ?? word.entry.form,
              },
            }
          : word;
      }),
    };
    return this;
  }

  updateVersion(version: number): Otm {
    this.otm = {
      ...this.otm,
      version,
    };
    return this;
  }

  updateZpdic(zpdic: Partial<Zpdic>): Otm {
    this.otm = {
      ...this.otm,
      zpdic: {
        ...this.otm.zpdic,
        ...zpdic,
      },
    };
    return this;
  }

  updateZpdicOnline(zpdicOnline: ZpdicOnline): Otm {
    this.otm = {
      ...this.otm,
      zpdicOnline: {
        ...this.otm.zpdicOnline,
        ...zpdicOnline,
      },
    };
    return this;
  }

  renumber(generator?: Generator<number>): Otm {
    this.wrapperIdGenerator = generator ?? defaultIdIterator();
    const newIds = new Map<number, number>(
      this.otm.words.map(word => [
        word.entry.id,
        this.wrapperIdGenerator.next().value,
      ]),
    );
    this.otm = {
      ...this.otm,
      words: this.otm.words.map(word => ({
        ...word,
        entry: {
          ...word.entry,
          id: newIds.get(word.entry.id) as number,
        },
        relations: word.relations.map(relation => ({
          ...relation,
          entry: {
            ...relation.entry,
            id: newIds.get(relation.entry.id) as number,
          },
        })),
      })),
    };
    return this;
  }

  addOptionKey(key: string, value: Json): Otm {
    this.otm = {
      ...this.otm,
      [key]: value,
    };
    return this;
  }
}

export type PlainOtm = {
  words: Word[];
  version?: number;
  zpdic?: Zpdic;
  zpdicOnline?: ZpdicOnline;
};

export const plainOtmScheme: JSONSchemaType<PlainOtm> = {
  type: 'object',
  properties: {
    words: {
      type: 'array',
      items: wordScheme,
    },
    version: {
      type: 'number',
      nullable: true,
    },
    zpdic: {
      ...zpdicScheme,
      nullable: true,
    },
    zpdicOnline: {
      ...zpdicOnlineScheme,
      nullable: true,
    },
  },
  required: ['words'],
};
