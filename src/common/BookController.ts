import Extension from './Extension';
import { BookControllerProperties } from './ExtensionProperties';
import { WordCard } from './WordCard';

export default abstract class BookController extends Extension {
  public abstract readonly properties: BookControllerProperties;

  abstract readWord(id: number): WordCard;

  abstract updateWord(word: WordCard): void;

  abstract readWords(): WordCard[];

  abstract load(path: string): Promise<BookController>;

  abstract save(path: string): Promise<BookController>;
}
