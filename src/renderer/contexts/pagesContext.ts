import { Mediator } from '../Mediator';
import { SummaryWord } from '../SummaryWord';

import makeStore from './makeStore';

type State = Mediator[];

type Action =
  | {
      type: 'ADD_PAGE';
      payload: Mediator;
    }
  | {
      type: 'REMOVE_PAGE';
      payload: SummaryWord;
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
            mediator.summary.id === action.payload.summary.id &&
            mediator.summary.bookPath === action.payload.summary.bookPath,
        )
      ) {
        return state;
      }
      return [...(state ?? []), action.payload];
    case 'REMOVE_PAGE':
      return (state ?? []).filter(
        mediator =>
          !(
            mediator.summary.id === action.payload.id &&
            mediator.summary.bookPath === action.payload.bookPath
          ),
      );
    case 'UPDATE_PAGE':
      return (state ?? []).map(mediator =>
        mediator.summary.id === action.payload.summary.id &&
        mediator.summary.bookPath === action.payload.summary.bookPath
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
