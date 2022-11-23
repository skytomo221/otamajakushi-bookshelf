import { SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery, takeLeading } from 'typed-redux-saga';
import { Action } from 'typescript-fsa';

import {
  addSelectedWordAction,
  fetchSelectedWordAction,
  onClickAction,
  pushSelectedWordAction,
  updateSelectedWordAction,
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
  const mediator = yield* call(api.readWord, summaryWord);
  yield* put(addSelectedWordAction(mediator));
}

export function* fetchWordAsync(): SagaIterator {
  yield* takeEvery(fetchSelectedWordAction, addSelectedWordAsnyc);
}

export function* updateSelectedWordAsnyc(
  action: Action<PayloadOf<typeof pushSelectedWordAction>>,
): SagaIterator {
  const mediator = action.payload;
  api.log.info('updateSelectedWordAsnyc', mediator);
  const newMediator = yield* call(
    api.updateWord,
    mediator.summary,
    mediator.word,
  );
  api.log.info('newMediator', newMediator);
  yield* put(updateSelectedWordAction(newMediator));
}

export function* pushWordAsync(): SagaIterator {
  yield* takeLeading(pushSelectedWordAction, updateSelectedWordAsnyc);
}

export function* onClickChildAsync(
  action: Action<PayloadOf<typeof onClickAction>>,
): SagaIterator {
  const { summary, onClick } = action.payload;
  api.log.info('onClickAsync', action.payload);
  const newMediator = yield* call(api.onClick, summary, onClick);
  api.log.info('newMediator', newMediator);
  yield* put(updateSelectedWordAction(newMediator));
}

export function* onClickAsync(): SagaIterator {
  yield* takeLeading(onClickAction, onClickChildAsync);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  yield* all([fetchWordAsync(), pushWordAsync(), onClickAsync()]);
}
