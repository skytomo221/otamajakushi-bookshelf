import { WordCard, Content, Tag } from '../common/WordCard';
import { Otm } from '../otm/Otm';
import OtmLoader from '../otm/OtmLoader';
import OtmSaver from '../otm/OtmSaver';
import { Word } from '../otm/Word';

import BookController from './BookController';

export default class OtmController extends BookController {
  public readonly name = 'OTM Controller';

  public readonly author = 'skytomo221';

  public readonly id = 'otm-controller';

  public readonly version = '0.1.0';

  public readonly format = 'file';

  public readonly filters = [{ name: 'OTM-JSON', extensions: ['json'] }];

  private otm: Otm | undefined;

  protected static toWordCard(word: Word): WordCard {
    return {
      form: word.entry.form,
      id: word.entry.id.toString(),
      tags: word.tags.map(
        (tag): Tag => ({
          name: tag,
        }),
      ),
      contents: word.contents.map(
        (content): Content => ({
          title: content.title,
          type: content.markdown ? 'text/markdown' : 'text/plain',
          description: content.text,
        }),
      ),
      translations: word.translations.map(translation => ({
        partOfSpeech: [translation.title],
        translatedWord: translation.forms,
      })),
    };
  }

  public readWords(): WordCard[] {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    return this.otm.toPlain().words.map(word => OtmController.toWordCard(word));
  }

  public readWord(id: number): WordCard {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    const word = this.otm.toPlain().words.find(w => w.entry.id === id);
    if (!word) {
      throw new Error('card not found');
    }
    return OtmController.toWordCard(word);
  }

  public updateWord(word: WordCard): number {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    this.otm.updateWord({
      filter: w => w.entry.id === parseInt(word.id, 10),
      map: () => ({
        entry: {
          form: word.form,
        },
        tags: word.tags?.map(tag => tag.name) ?? [],
        contents:
          word.contents?.map(content => ({
            title: content.title,
            markdown:
              content.type === 'text/markdown'
                ? content.description
                : undefined,
            text: content.description,
          })) ?? [],
        translations:
          word.translations?.map(translation => ({
            title: translation.partOfSpeech.join('・'),
            forms: translation.translatedWord,
          })) ?? [],
      }),
    });
    return parseInt(word.id, 10);
  }

  public async load(path: string): Promise<BookController> {
    const loader = new OtmLoader(path);
    return loader
      .asPromise()
      .then(otm => {
        this.otm = otm;
        return this;
      })
      .catch(error => {
        throw error;
      });
  }

  public async save(path: string): Promise<BookController> {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    const saver = new OtmSaver(this.otm, path);
    return saver
      .asPromise()
      .then(() => this)
      .catch(error => {
        throw error;
      });
  }
}
