import { WordCard } from '../renderer/WordCard';

import Extension from './Extension';

export interface FileFilter {
  // Docs: https://electronjs.org/docs/api/structures/file-filter
  extensions: string[];
  name: string;
}

export default abstract class BookController extends Extension {
  public readonly extensionType = 'book-controller';

  abstract readonly format: 'file' | 'folder';

  abstract readonly filters: FileFilter[];

  abstract readWord(id: number): WordCard;

  abstract updateWord(word: WordCard): void;

  abstract readWords(): WordCard[];

  abstract load(path: string): Promise<BookController>;

  abstract save(path: string): Promise<BookController>;
}
