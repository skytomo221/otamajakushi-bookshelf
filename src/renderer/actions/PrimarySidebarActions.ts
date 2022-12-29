import { actionCreatorFactory } from 'typescript-fsa';

import Book from '../states/Book';
import PrimarySidebarStates from '../states/PrimarySidebarState';

const actionCreator = actionCreatorFactory('primary-sidebar-action');

export const changePrimarySidebarAction =
  actionCreator<null | PrimarySidebarStates>('change-sidebar');

export const updatePrimarySidebarAction =
  actionCreator<Partial<PrimarySidebarStates>>('update-sidebar');

export const readTemplatesAction = actionCreator<Book>('read-templates');

export const readPageExplorerAction = actionCreator<void>('read-page-explorer');

export const readSearchModeAction = actionCreator<Book>('read-search-mode');

export const readSearchWordAction = actionCreator<string>('read-search-word');

export const updateSearchWordAction =
  actionCreator<string>('update-search-word');
