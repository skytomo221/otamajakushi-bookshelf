import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { LayoutCard } from '../LayoutCard';
import {
  addSelectedWordAction,
  removeSelectedWordAction,
} from '../actions/SelectedWordsActions';

const initWord: null | LayoutCard[] = null;

const selectedWordsReducer = reducerWithInitialState<null | LayoutCard[]>(
  initWord,
)
  .case(addSelectedWordAction, (state, payload) => {
    if (state === null) {
      return [payload];
    }
    if (
      state.some(
        card =>
          card.word.id === payload.word.id &&
          card.word.bookPath === payload.word.bookPath,
      )
    ) {
      return state;
    }
    return [...(state ?? []), payload];
  })
  .case(removeSelectedWordAction, (state, payload) =>
    (state ?? []).filter(
      card =>
        !(
          card.word.id === payload.word.id &&
          card.word.bookPath === payload.word.bookPath
        ),
    ),
  )
  .build();

export default selectedWordsReducer;
