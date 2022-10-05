import { SummaryWord } from '../renderer/SummaryWord';
import { WordCard } from '../renderer/WordCard';

export default abstract class DictionaryController {
  abstract readWord(id: number): WordCard;

  abstract updateWord(summary: WordCard): void;

  abstract readWords(): Omit<SummaryWord, 'bookPath'>[];
}
