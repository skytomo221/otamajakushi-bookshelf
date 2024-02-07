import makeStore from './makeStore';

export type State = {
  display: boolean;
  bookPath: null | string;
};

export type Action = {
  type: 'UPDATE_BOOK_PATH';
  payload: null | string;
};

const initialState: State = {
  display: false,
  bookPath: null,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_BOOK_PATH':
      return { display: action.payload !== null, bookPath: action.payload };
    default:
      return state;
  }
};

const [
  PrimarySidebarProvider,
  usePrimarySidebarStore,
  usePrimarySidebarDispatch,
] = makeStore(reducer, initialState);

export {
  PrimarySidebarProvider,
  usePrimarySidebarStore,
  usePrimarySidebarDispatch,
};
