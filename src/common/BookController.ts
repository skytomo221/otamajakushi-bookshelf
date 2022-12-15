import Extension from './Extension';
import { BookControllerProperties } from './ExtensionProperties';
import { WordCard } from './WordCard';

export default abstract class BookController extends Extension {
  public abstract readonly properties: BookControllerProperties;

  abstract deletePage(id: number): boolean;

  abstract readPage(id: number): WordCard;

  abstract updatePage(word: WordCard): void;

  abstract readIndexes(): WordCard[];

  abstract onClick(script: string, id: number): WordCard;

  abstract newBook(path: string): Promise<BookController>;

  abstract load(path: string): Promise<BookController>;

  abstract save(path: string): Promise<BookController>;
}
