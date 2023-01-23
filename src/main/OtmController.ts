import Ajv from 'ajv';

import BookController from '../common/BookController';
import { BookControllerProperties } from '../common/ExtensionProperties';
import { IndexCard } from '../common/IndexCard';
import { PageCard } from '../common/PageCard';
import { SearchCard } from '../common/SearchCard';
import TemplateProperties from '../common/TemplateProperties';
import { initOtm, Otm } from '../otm/Otm';
import OtmLoader from '../otm/OtmLoader';
import OtmSaver from '../otm/OtmSaver';
import { Word, wordScheme } from '../otm/Word';

export default class OtmController extends BookController {
  public properties = async (): Promise<BookControllerProperties> => ({
    name: 'OTM Controller',
    id: 'otm-controller',
    version: '0.1.0',
    type: 'book-controller',
    author: 'skytomo221',
    format: 'file',
    filters: [{ name: 'OTM-JSON', extensions: ['json'] }],
  });

  private otm: Otm | undefined;

  protected static toWordCard(word: Word): PageCard {
    return {
      id: word.entry.id.toString(),
      title: word.entry.form,
      ...word,
    };
  }

  protected static toIndexCard(word: Word): IndexCard {
    return {
      id: word.entry.id.toString(),
      title: word.entry.form,
    };
  }

  public async createPage(): Promise<string> {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    let newId = -1;
    this.otm.addWord(id => {
      newId = id;
      return {
        entry: {
          form: 'New Word',
        },
      };
    });
    return newId.toString();
  }

  public async deletePage(id: string): Promise<boolean> {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    this.otm.removeWord(parseInt(id, 10));
    return true;
  }

  public async readPage(id: string): Promise<PageCard> {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    const numberId = parseInt(id, 10);
    const word = this.otm.toPlain().words.find(w => w.entry.id === numberId);
    if (!word) {
      throw new Error('card not found');
    }
    return OtmController.toWordCard(word);
  }

  public async readPages(ids: string[]): Promise<PageCard[]> {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    return this.otm
      .toPlain()
      .words.filter(word => ids.includes(word.entry.id.toString()))
      .map(word => OtmController.toWordCard(word));
  }

  public async readTemplates(): Promise<TemplateProperties[]> {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    return [
      {
        id: 'new-word',
        name: '新しく単語を作成する',
      },
    ];
  }

  public async updatePage(word: PageCard): Promise<string> {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    const ajv = new Ajv();
    const valid = ajv.validate(wordScheme, word);
    if (!valid) {
      throw new Error(ajv.errorsText());
    }
    this.otm.updateWord({
      filter: w => w.entry.id === parseInt(word.id, 10),
      map: () => word,
    });
    return word.id;
  }

  // eslint-disable-next-line class-methods-use-this
  public async readSearchModes(): Promise<string[]> {
    return ['form', 'translation', 'both', 'all'];
  }

  public async readSearchIndexes(searchModeId: string): Promise<SearchCard[]> {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    switch (searchModeId) {
      case 'form':
        return this.otm.toPlain().words.map(word => ({
          id: word.entry.id.toString(),
          targets: [word.entry.form],
        }));
      case 'translation':
        return this.otm.toPlain().words.map(word => ({
          id: word.entry.id.toString(),
          targets: word.translations.map(t => t.forms).flat(),
        }));
      case 'both':
        return this.otm.toPlain().words.map(word => ({
          id: word.entry.id.toString(),
          targets: [
            word.entry.form,
            ...word.translations.map(t => t.forms).flat(),
          ],
        }));
      case 'all':
        return this.otm.toPlain().words.map(word => ({
          id: word.entry.id.toString(),
          targets: [
            word.entry.form,
            ...word.translations.map(t => t.forms).flat(),
            ...word.contents.map(c => c.text),
          ],
        }));
      default:
        return [];
    }
  }

  public async onClick(script: string, id: number): Promise<PageCard> {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    if (script === 'contents/add') {
      this.otm.updateWord({
        filter: w => w.entry.id === id,
        map: w => ({
          ...w,
          contents: [
            ...w.contents,
            {
              title: 'New Content',
              markdown: 'No description',
              text: '',
            },
          ],
        }),
      });
    }
    const word = this.otm.toPlain().words.find(w => w.entry.id === id);
    if (!word) {
      throw new Error('card not found');
    }
    return OtmController.toWordCard(word);
  }

  public async newBook(path: string): Promise<BookController> {
    const saver = new OtmSaver(Otm.fromPlain(initOtm), path);
    return saver
      .asPromise()
      .then(() => {
        this.otm = Otm.fromPlain(initOtm);
        return this;
      })
      .catch(error => {
        throw error;
      });
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
