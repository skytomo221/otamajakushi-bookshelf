
import { LayoutCard } from '../common/LayoutCard';
import { PageCard } from '../common/PageCard';

import { SummaryWord } from './SummaryWord';


export interface Mediator {
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}
