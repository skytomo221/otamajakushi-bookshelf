import makeStore from './makeStore';

export type State = {
  display: boolean;
  bookPath: null | string;
};

export type Action = {
  type: 'CHANGE_SIDEBAR';
  payload: null | string;
};

const initialState: State = {
  display: false,
  bookPath: null,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE_SIDEBAR':
      return { display: action.payload !== null, bookPath: action.payload };
    default:
      return state;
  }
};

const [
  SecondarySidebarProvider,
  useSecondarySidebarStore,
  useSecondarySidebarDispatch,
] = makeStore(reducer, initialState);

export {
  SecondarySidebarProvider,
  useSecondarySidebarStore,
  useSecondarySidebarDispatch,
};
