import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('primary-sidebar-action');

const updatePrimarySidebarAction = actionCreator<null | string>(
  'update-book-path',
);

export default updatePrimarySidebarAction;
