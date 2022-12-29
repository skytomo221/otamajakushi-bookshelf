import { useSelector } from 'react-redux';
import { SagaIterator } from 'redux-saga';
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLeading,
} from 'typed-redux-saga';
import { Action } from 'typescript-fsa';

import {
  readPageExplorerAction,
  readSearchModeAction,
  readTemplatesAction,
  updatePrimarySidebarAction,
  updateSearchWordAction,
} from './actions/PrimarySidebarActions';
import {
  addSelectedWordAction,
  deleteSelectedWordAction,
  fetchSelectedWordAction,
  onClickAction,
  pushSelectedWordAction,
  removeSelectedWordAction,
  updateSelectedWordAction,
} from './actions/SelectedWordsActions';
import Book from './states/Book';
import PrimarySidebarState from './states/PrimarySidebarState';
import { State } from './states/State';

const { api } = window;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PayloadOf<Op> = Op extends (params: infer P, ...args: any[]) => any
  ? P
  : never;

export function* addSelectedWordAsnyc(
  action: Action<PayloadOf<typeof fetchSelectedWordAction>>,
): SagaIterator {
  const summaryWord = action.payload;
  const mediator = yield* call(api.readPage, summaryWord);
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
    api.updatePage,
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

export function* deleteChildAsync(
  action: Action<PayloadOf<typeof deleteSelectedWordAction>>,
): SagaIterator {
  const summary = action.payload;
  api.log.info('onDeleteAsync', action.payload);
  yield* call(api.deletePage, summary);
  yield* put(removeSelectedWordAction(summary));
}

export function* deleteAsync(): SagaIterator {
  yield* takeLeading(deleteSelectedWordAction, deleteChildAsync);
}

export function* readTemplatesAsync(action: Action<Book>): SagaIterator {
  const book = action.payload;
  api.log.info('readTemplatesAsync', action.payload);
  const templates = yield* call(api.readTemplates, book.path);
  yield* put(updatePrimarySidebarAction({ templates }));
}

export function* pullTemplateAsync(): SagaIterator {
  yield* takeLeading(readTemplatesAction, readTemplatesAsync);
}

export function* readPageExplorerAsync(action: Action<void>): SagaIterator {
  api.log.info('readPageExplorerAsync', action.payload);
  const pageExplorers = yield* call(api.readPageExplorer);
  yield* put(
    updatePrimarySidebarAction({
      pageExplorers,
      pageExplorer: pageExplorers[0],
    }),
  );
}

export function* pullPageExplorerAsync(): SagaIterator {
  yield* takeLeading(readPageExplorerAction, readPageExplorerAsync);
}

export function* readSearchModesAsync(action: Action<Book>): SagaIterator {
  const book = action.payload;
  api.log.info('readSearchModesAsync', action.payload);
  const searchModes = yield* call(api.readSearchMode, book.path);
  yield* put(
    updatePrimarySidebarAction({ searchModes, searchMode: searchModes[0] }),
  );
}

export function* pullSearchModesAsync(): SagaIterator {
  yield* takeLeading(readSearchModeAction, readSearchModesAsync);
}

export function* readSearchWordAsync(action: Action<string>): SagaIterator {
  const searchWord = action.payload;
  api.log.info('readSearchWordAsync', action.payload);
  yield* put(updatePrimarySidebarAction({ searchWord }));
  const primarySidebar = yield* select(state => state.primarySidebar);
  if (primarySidebar === null) {
    throw new Error('primarySidebar is null');
  }
  const mediators = yield* call(
    api.selectPage,
    primarySidebar.book.path,
    primarySidebar.pageExplorer.id,
    primarySidebar.searchMode,
    primarySidebar.searchWord,
  );
  yield* put(updatePrimarySidebarAction({ mediators }));
}

export function* pullSearchWordAsync(): SagaIterator {
  yield* takeLeading(updateSearchWordAction, readSearchWordAsync);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  yield* all([
    fetchWordAsync(),
    pushWordAsync(),
    onClickAsync(),
    deleteAsync(),
    pullTemplateAsync(),
    pullPageExplorerAsync(),
    pullSearchModesAsync(),
    pullSearchWordAsync(),
  ]);
}
