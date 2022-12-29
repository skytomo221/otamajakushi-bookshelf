import Extension from './Extension';
import { BookControllerProperties } from './ExtensionProperties';
import { IndexCard } from './IndexCard';
import { PageCard } from './PageCard';
import { SearchCard } from './SearchCard';
import TemplateProperties from './TemplateProperties';

export default abstract class BookController extends Extension {
  public abstract readonly properties: BookControllerProperties;

  abstract createPage(templateId: string): string;

  abstract deletePage(id: number): boolean;

  abstract readPage(id: string): PageCard;

  abstract readPages(ids: string[]): PageCard[];

  abstract updatePage(word: PageCard): void;

  abstract readSearchModes(): string[];

  abstract readSearchIndexes(searchModeId: string): SearchCard[];

  abstract readTemplates(): TemplateProperties[];

  abstract onClick(script: string, id: number): PageCard;

  abstract newBook(path: string): Promise<BookController>;

  abstract load(path: string): Promise<BookController>;

  abstract save(path: string): Promise<BookController>;
}
