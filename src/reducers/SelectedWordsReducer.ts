import { Word } from 'otamajakushi/dist/Word';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import {
  addSelectedWordAction,
  removeSelectedWordAction,
} from '../actions/SelectedWordsActions';
import SelectedWord from '../states/SelectedWord';

const initWord: null | SelectedWord[] = null;

const selectedWordsReducer = reducerWithInitialState<null | SelectedWord[]>(
  initWord,
)
  .case(addSelectedWordAction, (state, payload) => {
    if (state === null) {
      return [payload];
    }
    if (state.some(word => word.id === payload.id && word.path === payload.path)) {
      return state;
    }
    return [...(state ?? []), payload];
  })
  .case(removeSelectedWordAction, (state, payload) =>
    (state ?? []).filter(
      word => !(word.id === payload.id && word.path === payload.path),
    ),
  )
  .build();

export default selectedWordsReducer;
