import { actionCreatorFactory } from 'typescript-fsa';

import SearchProperties from '../../common/SearchProperties';
import Book from '../states/Book';
import Workbench from '../states/Workbench';

const actionCreator = actionCreatorFactory('workbenches-action');

export const addWorkbenchAction = actionCreator<Workbench>('add-workbench');
export const editBookAction = actionCreator<{
  path: string;
  editable: boolean;
}>('edit-book');
export const removeWorkbenchAction = actionCreator<string>('remove-workbench');
export const initializeWorkbench = actionCreator<Book>('initialize-workbench');
export const updatePageExplorerAction = actionCreator<SearchProperties>(
  'update-page-explorer',
);
export const updateSearchModeAction =
  actionCreator<string>('update-search-mode');
export const updateSearchWordAction =
  actionCreator<string>('update-search-word');
export const updateWorkbenchAction = actionCreator<{
  path: string;
  partial: Partial<Workbench>;
}>('update-sidebar');
