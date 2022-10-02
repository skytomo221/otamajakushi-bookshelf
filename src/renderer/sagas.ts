import { SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery } from 'typed-redux-saga';
import { Action } from 'typescript-fsa';

import {
  addSelectedWordAction,
  fetchSelectedWordAction,
} from './actions/SelectedWordsActions';

const { api } = window;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PayloadOf<Op> = Op extends (params: infer P, ...args: any[]) => any
  ? P
  : never;

export function* addSelectedWordAsnyc(
  action: Action<PayloadOf<typeof fetchSelectedWordAction>>,
): SagaIterator {
  const summaryWord = action.payload;
  const layoutCard = yield* call(api.word, summaryWord);
  yield* put(addSelectedWordAction(layoutCard));
}

export function* fetchWordAsync(): SagaIterator {
  yield* takeEvery(fetchSelectedWordAction, addSelectedWordAsnyc);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  yield* all([fetchWordAsync()]);
}
