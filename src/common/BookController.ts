import Extension from './Extension';
import { BookControllerProperties } from './ExtensionProperties';
import { PageCard } from './PageCard';
import { SearchCard } from './SearchCard';
import TemplateProperties from './TemplateProperties';

export default abstract class BookController extends Extension {
  abstract properties(): Promise<BookControllerProperties>;

  abstract createPage(templateId: string): Promise<string>;

  abstract deletePage(id: string): Promise<boolean>;

  abstract readPage(id: string): Promise<PageCard>;

  abstract readPages(ids: string[]): Promise<PageCard[]>;

  abstract updatePage(word: PageCard): Promise<string>;

  abstract readSearchModes(): Promise<string[]>;

  abstract readSearchIndexes(searchModeId: string): Promise<SearchCard[]>;

  abstract readTemplates(): Promise<TemplateProperties[]>;

  abstract onClick(script: string, id: number): Promise<PageCard>;

  abstract newBook(path: string): Promise<BookController>;

  abstract load(path: string): Promise<BookController>;

  abstract save(path: string): Promise<BookController>;
}
