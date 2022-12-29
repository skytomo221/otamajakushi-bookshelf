import { reducerWithInitialState } from 'typescript-fsa-reducers';

import {
  changePrimarySidebarAction,
  updatePrimarySidebarAction,
} from '../actions/PrimarySidebarActions';
import PrimarySidebarStates from '../states/PrimarySidebarState';

const initPrimarySidebarStates: PrimarySidebarStates = {
  book: { path: '', editable: false },
  pageExplorer: { id: '', displayName: '' },
  pageExplorers: [],
  searchModes: [],
  searchMode: '',
  searchWord: '',
  templates: [],
  mediators: [],
};

const primarySidebarReducer =
  reducerWithInitialState<null | PrimarySidebarStates>(null)
    .case(changePrimarySidebarAction, (_, payload) => payload)
    .case(updatePrimarySidebarAction, (state, payload) => {
      if (state === null) {
        return {
          ...initPrimarySidebarStates,
          ...payload,
        };
      }
      return { ...state, ...payload };
    })
    .build();

export default primarySidebarReducer;
