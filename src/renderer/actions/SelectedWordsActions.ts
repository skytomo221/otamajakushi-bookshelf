import { Word } from 'otamajakushi/dist/Word';
import { actionCreatorFactory } from 'typescript-fsa';

import SelectedWord from '../states/SelectedWord';

const actionCreator = actionCreatorFactory('selected-word-action');

export const addSelectedWordAction = actionCreator<SelectedWord>(
  'selected-word/add',
);
export const removeSelectedWordAction = actionCreator<SelectedWord>(
  'selected-word/remove',
);
