import { actionCreatorFactory } from 'typescript-fsa';

import { LayoutCard } from '../LayoutCard';
import { SummaryWord } from '../SummaryWord';

const actionCreator = actionCreatorFactory('selected-word-action');

export const addSelectedWordAction =
  actionCreator<LayoutCard>('selected-word/add');
export const removeSelectedWordAction = actionCreator<LayoutCard>(
  'selected-word/remove',
);
export const fetchSelectedWordAction = actionCreator<SummaryWord>("selected-word/fetch");
