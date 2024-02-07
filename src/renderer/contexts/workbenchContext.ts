import SearchProperties from 'otamashelf/SearchProperties';
import TemplateProperties from 'otamashelf/TemplateProperties';

import { Mediator } from '../Mediator';
import Book from '../states/Book';

import makeStore from './makeStore';

type Workbench = {
  book: Book;
  pageExplorer: SearchProperties;
  pageExplorers: SearchProperties[];
  searchMode: string;
  searchModes: string[];
  searchWord: string;
  templates: TemplateProperties[];
  mediators: Mediator[];
};

type State = Workbench[];

type Action =
  | {
      type: 'ADD_WORKBENCH';
      payload: Workbench;
    }
  | {
      type: 'EDIT_BOOK';
      payload: {
        path: string;
        editable: boolean;
      };
    }
  | {
      type: 'REMOVE_WORKBENCH';
      payload: string;
    }
  | {
      type: 'UPDATE_WORKBENCH';
      payload: {
        path: string;
        partial: Partial<Workbench>;
      };
    };

const initialState: State = [];

const reducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_WORKBENCH':
      return [...state, payload];
    case 'EDIT_BOOK':
      return state.map(workbench =>
        workbench.book.path === payload.path
          ? {
              ...workbench,
              book: { ...workbench.book, editable: payload.editable },
            }
          : workbench,
      );
    case 'REMOVE_WORKBENCH':
      return state.filter(workbench => workbench.book.path !== payload);
    case 'UPDATE_WORKBENCH':
      return state.map(workbench =>
        workbench.book.path === payload.path
          ? { ...workbench, ...payload.partial }
          : workbench,
      );
    default:
      return state;
  }
};

const [WorkbenchProvider, useWorkbenchStore, useWorkbenchDispatch] = makeStore(
  reducer,
  initialState,
);

export { WorkbenchProvider, useWorkbenchStore, useWorkbenchDispatch };
