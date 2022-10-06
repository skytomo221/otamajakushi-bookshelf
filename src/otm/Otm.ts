import { fold } from 'fp-ts/Either';
import { parse, Json, JsonArray, JsonRecord } from 'fp-ts/Json';
import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';

import { TWord, Word } from './Word';
import { TZpdic, Zpdic } from './Zpdic';
import { TZpdicOnline, ZpdicOnline } from './ZpdicOnline';

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

const isJson = (arg: unknown): arg is JsonArray =>
  typeof arg === 'string' ||
  typeof arg === 'number' ||
  typeof arg === 'boolean' ||
  arg === null ||
  isJsonArray(arg) ||
  isJsonRecord(arg);

const isJsonArray = (arg: unknown): arg is JsonArray =>
  typeof arg === 'object' &&
  arg !== null &&
  (arg as JsonArray).every((item: unknown) => isJson(item));

const isJsonRecord = (arg: unknown): arg is JsonRecord =>
  typeof arg === 'object' &&
  arg !== null &&
  Object.keys(arg as JsonRecord)
    .map(key => typeof key === 'string' && isJson(key))
    .every(result => result === true);

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
    pipe(
      json,
      parse,
      fold(
        (error: unknown) => {
          throw error;
        },
        (otmjson: Json) => {
          pipe(
            otmjson,
            TPlainOtm.decode,
            fold(
              (error: unknown) => {
                throw error;
              },
              (otm: PlainOtm) => {
                this.otm = otm;
              },
            ),
          );
        },
      ),
    );
    return this;
  }

  set idGenerator(generator: Generator<number>) {
    function* wrapper(otmc: Otm) {
      while (true) {
        let nextId: number = generator.next().value;
        const duplicate = (id: number): boolean =>
          otmc.otm.words.some(word => word.entry.id === id);
        while (duplicate(nextId)) {
          nextId += generator.next().value;
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
    word: Partial<
      Omit<Word, 'entry'> & { entry: { id?: number; form: string } }
    >,
  ): Otm {
    this.otm = {
      ...this.otm,
      words: [
        ...this.otm.words,
        {
          entry: {
            id: word.entry?.id ?? this.wrapperIdGenerator.next().value,
            form: word.entry?.form ?? '',
          },
          translations: word.translations ?? [],
          tags: word.tags ?? [],
          contents: word.contents ?? [],
          variations: word.variations ?? [],
          relations: word.relations ?? [],
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

export const TPlainOtm = t.type({
  words: t.array(TWord),
  version: t.union([t.undefined, t.number]),
  zpdic: t.union([t.undefined, TZpdic]),
  zpdicOnline: t.union([t.undefined, TZpdicOnline]),
});
