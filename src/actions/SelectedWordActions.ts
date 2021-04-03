import { Word } from 'otamajakushi/dist/Word';
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('selected-word-action');

export const changeSelectedWordAction = actionCreator<Partial<Word>>(
  'change-selected-word',
);

export default changeSelectedWordAction;
