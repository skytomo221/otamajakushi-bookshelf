import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { LayoutCard } from '../LayoutCard';
import {
  addSelectedWordAction,
  removeSelectedWordAction,
  updateSelectedWordAction,
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
          card.summary.id === payload.summary.id &&
          card.summary.bookPath === payload.summary.bookPath,
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
          card.summary.id === payload.summary.id &&
          card.summary.bookPath === payload.summary.bookPath
        ),
    ),
  )
  .case(updateSelectedWordAction, (state, payload) =>
    (state ?? []).map(card =>
      card.summary.id === payload.summary.id &&
      card.summary.bookPath === payload.summary.bookPath
        ? payload
        : card,
    ),
  )
  .build();

export default selectedWordsReducer;
