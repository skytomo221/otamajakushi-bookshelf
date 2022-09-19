import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('secondary-sidebar-action');

export const changeSecondarySidebarAction = actionCreator<Partial<null | string>>(
  'change-sidebar',
);

export default changeSecondarySidebarAction;
