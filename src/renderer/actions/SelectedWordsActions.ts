import { actionCreatorFactory } from 'typescript-fsa';

import { Mediator } from '../Mediator';
import { SummaryWord } from '../SummaryWord';

const actionCreator = actionCreatorFactory('selected-word-action');

export const addSelectedWordAction =
  actionCreator<Mediator>('selected-word/add');
export const deleteSelectedWordAction = actionCreator<SummaryWord>(
  'selected-word/delete',
);
export const removeSelectedWordAction = actionCreator<SummaryWord>(
  'selected-word/remove',
);
export const updateSelectedWordAction = actionCreator<Mediator>(
  'selected-word/update',
);
export const fetchSelectedWordAction = actionCreator<SummaryWord>(
  'selected-word/fetch',
);
export const pushSelectedWordAction =
  actionCreator<Mediator>('selected-word/push');
export const onClickAction = actionCreator<{
  summary: SummaryWord;
  onClick: string;
}>('selected-word/on-click');
