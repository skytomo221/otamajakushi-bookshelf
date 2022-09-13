import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { changePrimarySidebarAction } from '../actions/PrimarySidebarActions';

const primarySidebarReducer = reducerWithInitialState<null | string>(null)
  .case(changePrimarySidebarAction, (_state, payload) => payload)
  .build();

export default primarySidebarReducer;
