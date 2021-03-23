import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('search-word-action');

export const changeSearchWordAction = actionCreator<Partial<string>>(
  'change-search-word',
);

export default changeSearchWordAction;
