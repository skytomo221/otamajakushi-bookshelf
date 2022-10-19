
import { LayoutCard } from '../common/LayoutCard';
import { WordCard } from '../common/WordCard';

import { SummaryWord } from './SummaryWord';


export interface Mediator {
  summary: SummaryWord;
  layout: LayoutCard;
  word: WordCard;
}
