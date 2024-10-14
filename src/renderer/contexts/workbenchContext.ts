import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { SearchResult } from 'otamashelf/PageExplorer';
import { NormalPageReference } from 'otamashelf/PageReference';
import { SearchCard } from 'otamashelf/SearchCard';

import makeStore from './makeStore';

type Workbench = {
  path: string;
  editable: boolean;
  indexes: (NormalPageReference & PageDisplayInformation)[];
  searchResults: (SearchCard & SearchResult)[];
  pageFormats: string[];
  selectedPageFormatIndex: number;
  searchCriteria: { id: string; name: string }[];
  selectedSearchCriterionIndex: number;
  searchScopes: { id: string; name: string }[];
  selectedSearchScopeIndex: number;
  searchWord: string;
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
      type: 'REMOVE_INDEX';
      payload: {
        path: string;
        index: NormalPageReference;
      };
    }
  | {
      type: 'UPDATE_INDEXES';
      payload: {
        path: string;
        indexes: (NormalPageReference & PageDisplayInformation)[];
      };
    }
  | {
      type: 'UPDATE_SEARCH_RESULTS';
      payload: {
        path: string;
        searchResults: (SearchCard & SearchResult)[];
      };
    }
  | {
      type: 'UPDATE_PAGE_FORMATS';
      payload: {
        path: string;
        pageFormats: string[];
      };
    }
  | {
      type: 'UPDATE_SELECTED_PAGE_FORMAT_INDEX';
      payload: {
        path: string;
        selectedPageFormatIndex: number;
      };
    }
  | {
      type: 'UPDATE_SEARCH_CRITERIA';
      payload: {
        path: string;
        searchCriteria: { id: string; name: string }[];
      };
    }
  | {
      type: 'UPDATE_SELECTED_SEARCH_CRITERION_INDEX';
      payload: {
        path: string;
        selectedSearchCriterionIndex: number;
      };
    }
  | {
      type: 'UPDATE_SEARCH_SCOPES';
      payload: {
        path: string;
        searchScopes: { id: string; name: string }[];
      };
    }
  | {
      type: 'UPDATE_SELECTED_SEARCH_SCOPE_INDEX';
      payload: {
        path: string;
        selectedSearchScopeIndex: number;
      };
    }
  | {
      type: 'UPDATE_SEARCH_WORD';
      payload: {
        path: string;
        searchWord: string;
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
        workbench.path === payload.path
          ? { ...workbench, editable: payload.editable }
          : workbench,
      );
    case 'REMOVE_WORKBENCH':
      return state.filter(workbench => workbench.path !== payload);
    case 'REMOVE_INDEX':
      return state.map(workbench =>
        workbench.path === payload.path
          ? {
              ...workbench,
              indexes: workbench.indexes.filter(
                index => index !== payload.index,
              ),
            }
          : workbench,
      );
    case 'UPDATE_INDEXES':
      return state.map(workbench =>
        workbench.path === payload.path
          ? { ...workbench, indexes: payload.indexes }
          : workbench,
      );
    case 'UPDATE_SEARCH_RESULTS':
      return state.map(workbench =>
        workbench.path === payload.path
          ? { ...workbench, searchResults: payload.searchResults }
          : workbench,
      );
    case 'UPDATE_PAGE_FORMATS':
      return state.map(workbench =>
        workbench.path === payload.path
          ? { ...workbench, pageFormats: payload.pageFormats }
          : workbench,
      );
    case 'UPDATE_SELECTED_PAGE_FORMAT_INDEX':
      return state.map(workbench =>
        workbench.path === payload.path
          ? {
              ...workbench,
              selectedPageFormatIndex: payload.selectedPageFormatIndex,
            }
          : workbench,
      );
    case 'UPDATE_SEARCH_CRITERIA':
      return state.map(workbench =>
        workbench.path === payload.path
          ? { ...workbench, searchCriteria: payload.searchCriteria }
          : workbench,
      );
    case 'UPDATE_SELECTED_SEARCH_CRITERION_INDEX':
      return state.map(workbench =>
        workbench.path === payload.path
          ? {
              ...workbench,
              selectedSearchCriterionIndex:
                payload.selectedSearchCriterionIndex,
            }
          : workbench,
      );
    case 'UPDATE_SEARCH_SCOPES':
      return state.map(workbench =>
        workbench.path === payload.path
          ? { ...workbench, searchScopes: payload.searchScopes }
          : workbench,
      );
    case 'UPDATE_SELECTED_SEARCH_SCOPE_INDEX':
      return state.map(workbench =>
        workbench.path === payload.path
          ? {
              ...workbench,
              selectedSearchScopeIndex: payload.selectedSearchScopeIndex,
            }
          : workbench,
      );
    case 'UPDATE_SEARCH_WORD':
      return state.map(workbench =>
        workbench.path === payload.path
          ? { ...workbench, searchWord: payload.searchWord }
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
