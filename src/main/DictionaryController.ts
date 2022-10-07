import { WordCard } from '../renderer/WordCard';

export default abstract class DictionaryController {
  abstract readWord(id: number): WordCard;

  abstract updateWord(word: WordCard): void;

  abstract readWords(): WordCard[];
}
