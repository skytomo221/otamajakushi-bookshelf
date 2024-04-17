import { PageProperties } from 'otamashelf/PageProperties';

import { Mediator } from '../Mediator';

import makeStore from './makeStore';

type State = Mediator[];

type Action =
  | {
      type: 'ADD_PAGE';
      payload: Mediator;
    }
  | {
      type: 'REMOVE_PAGE';
      payload: PageProperties;
    }
  | {
      type: 'UPDATE_PAGE';
      payload: Mediator;
    };

const initialState: State = [];

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_PAGE':
      if (
        state.some(
          mediator =>
            mediator.pageProperties.id === action.payload.pageProperties.id &&
            mediator.pageProperties.path === action.payload.pageProperties.path,
        )
      ) {
        return state;
      }
      return [...(state ?? []), action.payload];
    case 'REMOVE_PAGE':
      return (state ?? []).filter(
        mediator =>
          !(
            mediator.pageProperties.id === action.payload.id &&
            mediator.pageProperties.path === action.payload.path
          ),
      );
    case 'UPDATE_PAGE':
      return (state ?? []).map(mediator =>
        mediator.pageProperties.id === action.payload.pageProperties.id &&
        mediator.pageProperties.path === action.payload.pageProperties.path
          ? action.payload
          : mediator,
      );
    default:
      return state;
  }
};

const [PagesProvider, usePagesStore, usePagesDispatch] = makeStore(
  reducer,
  initialState,
);

export { PagesProvider, usePagesStore, usePagesDispatch };
