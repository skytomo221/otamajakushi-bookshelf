import { Mediator } from '../Mediator';

import makeStore from './makeStore';
import { NormalPageReference } from 'otamashelf/PageReference';

type State = Mediator[];

type Action =
  | {
      type: 'ADD_PAGE';
      payload: Mediator;
    }
  | {
      type: 'REMOVE_PAGE';
      payload: NormalPageReference;
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
            mediator.index.pageId === action.payload.index.pageId &&
            mediator.index.bookPath === action.payload.index.bookPath,
        )
      ) {
        return state;
      }
      return [...(state ?? []), action.payload];
    case 'REMOVE_PAGE':
      return (state ?? []).filter(
        mediator =>
          !(
            mediator.index.pageId === action.payload.pageId &&
            mediator.index.bookPath === action.payload.bookPath
          ),
      );
    case 'UPDATE_PAGE':
      return (state ?? []).map(mediator =>
        mediator.index.pageId === action.payload.index.pageId &&
        mediator.index.bookPath === action.payload.index.bookPath
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
