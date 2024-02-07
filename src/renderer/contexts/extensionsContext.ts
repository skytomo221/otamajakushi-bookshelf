import { ExtensionProperties } from 'otamashelf/ExtensionProperties';

import makeStore from './makeStore';

export type State = ExtensionProperties[];

export type Action = {
  type: 'UPDATE_EXTENSIONS';
  payload: ExtensionProperties[];
};

const initialState: State = [];

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_EXTENSIONS':
      return action.payload;
    default:
      return state;
  }
};

const [ExtensionsProvider, useExtensionsStore, useExtensionsDispatch] =
  makeStore(reducer, initialState);

export { ExtensionsProvider, useExtensionsStore, useExtensionsDispatch };
