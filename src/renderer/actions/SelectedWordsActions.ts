import { actionCreatorFactory } from 'typescript-fsa';

import { LayoutCard } from '../LayoutCard';

const actionCreator = actionCreatorFactory('selected-word-action');

export const addSelectedWordAction =
  actionCreator<LayoutCard>('selected-word/add');
export const removeSelectedWordAction = actionCreator<LayoutCard>(
  'selected-word/remove',
);
