import makeStore from './makeStore';

export type State = {
  display: boolean;
  path: null | string;
};

export type Action = {
  type: 'UPDATE_PATH';
  payload: null | string;
};

const initialState: State = {
  display: false,
  path: null,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_PATH':
      return { display: action.payload !== null, path: action.payload };
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
