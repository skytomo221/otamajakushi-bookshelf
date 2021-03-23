import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { changeSearchWordAction } from '../actions/SearchWordActions';

const searchWordReducer = reducerWithInitialState<string>('')
  .case(changeSearchWordAction, (_state, payload) => payload)
  .build();

export default searchWordReducer;
