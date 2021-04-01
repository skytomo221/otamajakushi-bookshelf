import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { changeSelectedWordAction } from '../actions/SelectedWordActions';

const searchWordReducer = reducerWithInitialState<number>(-1)
  .case(changeSelectedWordAction, (_state, payload) => payload)
  .build();

export default searchWordReducer;
