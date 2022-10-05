import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { LayoutCard } from '../LayoutCard';
import { Mediator } from '../Mediator';
import {
  addSelectedWordAction,
  removeSelectedWordAction,
  updateSelectedWordAction,
} from '../actions/SelectedWordsActions';

const initWord: null | Mediator[] = null;

const selectedWordsReducer = reducerWithInitialState<null | Mediator[]>(
  initWord,
)
  .case(addSelectedWordAction, (state, payload) => {
    if (state === null) {
      return [payload];
    }
    if (
      state.some(
        mediator =>
          mediator.summary.id === payload.summary.id &&
          mediator.summary.bookPath === payload.summary.bookPath,
      )
    ) {
      return state;
    }
    return [...(state ?? []), payload];
  })
  .case(removeSelectedWordAction, (state, payload) =>
    (state ?? []).filter(
      mediator =>
        !(
          mediator.summary.id === payload.summary.id &&
          mediator.summary.bookPath === payload.summary.bookPath
        ),
    ),
  )
  .case(updateSelectedWordAction, (state, payload) =>
    (state ?? []).map(mediator =>
      mediator.summary.id === payload.summary.id &&
      mediator.summary.bookPath === payload.summary.bookPath
        ? payload
        : mediator,
    ),
  )
  .build();

export default selectedWordsReducer;
