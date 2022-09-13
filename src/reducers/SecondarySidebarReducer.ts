import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { changeSecondarySidebarAction } from '../actions/SecondarySidebarActions';

const secondarySidebarReducer = reducerWithInitialState<null | string>(null)
  .case(changeSecondarySidebarAction, (_state, payload) => payload)
  .build();

export default secondarySidebarReducer;
