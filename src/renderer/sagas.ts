import { SagaIterator } from 'redux-saga';
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  takeLeading,
} from 'typed-redux-saga';
import { Action } from 'typescript-fsa';

import SearchProperties from '../common/SearchProperties';

import {
  addSelectedWordAction,
  deleteSelectedWordAction,
  fetchSelectedWordAction,
  onClickAction,
  pushSelectedWordAction,
  removeSelectedWordAction,
  updateSelectedWordAction,
} from './actions/SelectedWordsActions';
import {
  addWorkbenchAction,
  initializeWorkbench,
  updateWorkbenchAction,
  updatePageExplorerAction,
  updateSearchWordAction,
  updateSearchModeAction,
} from './actions/WorkbenchesActions';
import Book from './states/Book';
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

export function* addWorkbenchAsync(action: Action<Book>): SagaIterator {
  const book = action.payload;
  api.log.info('addWorkbenchAsync', action.payload);
  const pageExplorers = yield* call(api.readPageExplorer, book.path);
  const pageExplorer = pageExplorers[0];
  const searchModes = yield* call(api.readSearchMode, book.path);
  const searchMode = searchModes[0];
  const templates = yield* call(api.readTemplates, book.path);
  const searchWord = '';
  const mediators = yield* call(
    api.selectPage,
    book.path,
    pageExplorer.id,
    searchMode,
    searchWord,
  );
  yield* put(
    addWorkbenchAction({
      book,
      pageExplorer,
      pageExplorers,
      searchMode,
      searchModes,
      searchWord,
      templates,
      mediators,
    }),
  );
}

export function* initializeWorkbenchAsync(): SagaIterator {
  yield* takeLeading(initializeWorkbench, addWorkbenchAsync);
}

export function* readPageExplorerAsync(action: Action<SearchProperties>): SagaIterator {
  const { bookPath } = yield* select((state: State) => state.primarySidebar);
  if (bookPath === null) {
    throw new Error('primarySidebar.bookPath is null');
  }
  const pageExplorer = action.payload;
  api.log.info('readSearchWordAsync', action.payload);
  yield* put(
    updateWorkbenchAction({ path: bookPath, partial: { pageExplorer } }),
  );
  const workbench = yield* select((state: State) =>
    state.workbenches.find(w => w.book.path === bookPath),
  );
  if (workbench === undefined) {
    throw new Error('workbench is null');
  }
  const mediators = yield* call(
    api.selectPage,
    workbench.book.path,
    workbench.pageExplorer.id,
    workbench.searchMode,
    workbench.searchWord,
  );
  yield* put(updateWorkbenchAction({ path: bookPath, partial: { mediators } }));
}

export function* pullPageExplorerAsync(): SagaIterator {
  yield* takeLatest(updatePageExplorerAction, readPageExplorerAsync);
}

export function* readSearchModeAsync(action: Action<string>): SagaIterator {
  const { bookPath } = yield* select((state: State) => state.primarySidebar);
  if (bookPath === null) {
    throw new Error('primarySidebar.bookPath is null');
  }
  const searchMode = action.payload;
  api.log.info('readSearchWordAsync', action.payload);
  yield* put(
    updateWorkbenchAction({ path: bookPath, partial: { searchMode } }),
  );
  const workbench = yield* select((state: State) =>
    state.workbenches.find(w => w.book.path === bookPath),
  );
  if (workbench === undefined) {
    throw new Error('workbench is null');
  }
  const mediators = yield* call(
    api.selectPage,
    workbench.book.path,
    workbench.pageExplorer.id,
    workbench.searchMode,
    workbench.searchWord,
  );
  yield* put(updateWorkbenchAction({ path: bookPath, partial: { mediators } }));
}

export function* pullSearchModeAsync(): SagaIterator {
  yield* takeLatest(updateSearchModeAction, readSearchModeAsync);
}

export function* readSearchWordAsync(action: Action<string>): SagaIterator {
  const { bookPath } = yield* select((state: State) => state.primarySidebar);
  if (bookPath === null) {
    throw new Error('primarySidebar.bookPath is null');
  }
  const searchWord = action.payload;
  api.log.info('readSearchWordAsync', action.payload);
  yield* put(
    updateWorkbenchAction({ path: bookPath, partial: { searchWord } }),
  );
  const workbench = yield* select((state: State) =>
    state.workbenches.find(w => w.book.path === bookPath),
  );
  if (workbench === undefined) {
    throw new Error('workbench is null');
  }
  const mediators = yield* call(
    api.selectPage,
    workbench.book.path,
    workbench.pageExplorer.id,
    workbench.searchMode,
    workbench.searchWord,
  );
  yield* put(updateWorkbenchAction({ path: bookPath, partial: { mediators } }));
}

export function* pullSearchWordAsync(): SagaIterator {
  yield* takeLatest(updateSearchWordAction, readSearchWordAsync);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  yield* all([
    fetchWordAsync(),
    pushWordAsync(),
    onClickAsync(),
    deleteAsync(),
    initializeWorkbenchAsync(),
    pullPageExplorerAsync(),
    pullSearchModeAsync(),
    pullSearchWordAsync(),
  ]);
}
