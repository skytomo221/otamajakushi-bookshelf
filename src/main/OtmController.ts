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
  public readonly properties: BookControllerProperties = {
    name: 'OTM Controller',
    id: 'otm-controller',
    version: '0.1.0',
    type: 'book-controller',
    author: 'skytomo221',
    format: 'file',
    filters: [{ name: 'OTM-JSON', extensions: ['json'] }],
  };

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

  public createPage(): string {
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

  public deletePage(id: number): boolean {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    this.otm.removeWord(id);
    return true;
  }

  public readPage(id: string): PageCard {
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

  public readPages(ids: string[]): PageCard[] {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    return this.otm
      .toPlain()
      .words.filter(word => ids.includes(word.entry.id.toString()))
      .map(word => OtmController.toWordCard(word));
  }

  public readTemplates(): TemplateProperties[] {
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

  public updatePage(word: PageCard): number {
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
    return parseInt(word.id, 10);
  }

  // eslint-disable-next-line class-methods-use-this
  public readSearchMode(): string[] {
    return ['form', 'translation', 'both', 'all'];
  }

  public readSearchIndexes(searchModeId: string): SearchCard[] {
    if (this.otm === undefined) {
      throw new Error('otm is undefined');
    }
    switch (searchModeId) {
      case 'form':
        return this.otm.toPlain().words.map(word => ({
          id: word.entry.id.toString(),
          target: [word.entry.form],
        }));
      case 'translation':
        return this.otm.toPlain().words.map(word => ({
          id: word.entry.id.toString(),
          target: word.translations.map(t => t.forms).flat(),
        }));
      case 'both':
        return this.otm.toPlain().words.map(word => ({
          id: word.entry.id.toString(),
          target: [
            word.entry.form,
            ...word.translations.map(t => t.forms).flat(),
          ],
        }));
      case 'all':
        return this.otm.toPlain().words.map(word => ({
          id: word.entry.id.toString(),
          target: [
            word.entry.form,
            ...word.translations.map(t => t.forms).flat(),
            ...word.contents.map(c => c.text),
          ],
        }));
      default:
        return [];
    }
  }

  public onClick(script: string, id: number): PageCard {
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
