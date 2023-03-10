import { reducerWithInitialState } from 'typescript-fsa-reducers';

import updatePrimarySidebarAction from '../actions/PrimarySidebarActions';
import PrimarySidebarStates from '../states/PrimarySidebarState';

const initPrimarySidebarStates: PrimarySidebarStates = {
  display: false,
  bookPath: null,
};

const primarySidebarReducer = reducerWithInitialState<PrimarySidebarStates>(
  initPrimarySidebarStates,
)
  .case(updatePrimarySidebarAction, (_, payload) => ({
    display: payload !== null,
    bookPath: payload,
  }))
  .build();

export default primarySidebarReducer;
