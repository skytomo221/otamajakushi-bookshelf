import Extension from './Extension';
import { BookControllerProperties } from './ExtensionProperties';
import { IndexCard } from './IndexCard';
import { PageCard } from './PageCard';
import TemplateProperties from './TemplateProperties';

export default abstract class BookController extends Extension {
  public abstract readonly properties: BookControllerProperties;

  abstract createPage(templateId: string): string;

  abstract deletePage(id: number): boolean;

  abstract readPage(id: string): PageCard;

  abstract updatePage(word: PageCard): void;

  abstract readIndex(id: string): IndexCard;

  abstract readIndexes(): IndexCard[];

  abstract readTemplates(): TemplateProperties[];

  abstract onClick(script: string, id: number): PageCard;

  abstract newBook(path: string): Promise<BookController>;

  abstract load(path: string): Promise<BookController>;

  abstract save(path: string): Promise<BookController>;
}
