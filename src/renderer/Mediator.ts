
import { PageCard, LayoutCard } from 'otamashelf';

import { SummaryWord } from './SummaryWord';


export interface Mediator {
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}
