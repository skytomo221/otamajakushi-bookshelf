import { LayoutCard } from './LayoutCard';
import { SummaryWord } from './SummaryWord';
import { WordCard } from './WordCard';


export interface Mediator {
  summary: SummaryWord;
  layout: LayoutCard;
  word: WordCard;
}
