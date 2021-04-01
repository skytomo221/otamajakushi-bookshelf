import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('selected-word-action');

export const changeSelectedWordAction = actionCreator<Partial<number>>(
  'change-selected-word',
);

export default changeSelectedWordAction;
