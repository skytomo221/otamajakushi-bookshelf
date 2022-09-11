import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('search-word-action');

export const changePrimarySidebarAction = actionCreator<Partial<null | string>>(
  'change-sidebar',
);

export default changePrimarySidebarAction;
