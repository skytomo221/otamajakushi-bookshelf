import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('primary-sidebar-action');

export const changePrimarySidebarAction = actionCreator<Partial<null | string>>(
  'change-sidebar',
);

export default changePrimarySidebarAction;
