import { NormalPageReference } from 'otamashelf/PageReference';

import {
  Mediator,
  isBookTemplateMediator,
  isNormalMediator,
  isPageTemplateMediator,
} from '../Mediator';

import makeStore from './makeStore';

type State = Mediator[];

export function isMediator(mediator: Mediator): mediator is Mediator {
  return 'index' in mediator;
}

type Action =
  | {
      type: 'ADD_PAGE';
      payload: Mediator;
    }
  | {
      type: 'REMOVE_PAGE';
      index: number;
    }
  | {
      type: 'REMOVE_NORMAL_PAGE';
      payload: NormalPageReference;
    }
  | {
      type: 'UPDATE_PAGE';
      payload: Mediator;
    }
  | {
      type: 'UPDATE_PAGE_WITH_INDEX';
      index: number;
      payload: Mediator;
    };

const initialState: State = [];

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_PAGE':
      if (
        !isBookTemplateMediator(action.payload) &&
        !isPageTemplateMediator(action.payload) &&
        state
          .filter(isNormalMediator)
          .some(
            mediator =>
              isNormalMediator(action.payload) &&
              mediator.index.pageId === action.payload.index.pageId &&
              mediator.index.bookPath === action.payload.index.bookPath,
          )
      ) {
        return state;
      }
      return [...(state ?? []), action.payload];
    case 'REMOVE_PAGE':
      return (state ?? []).filter((_, index) => index !== action.index);
    case 'REMOVE_NORMAL_PAGE':
      return (state ?? []).filter(
        mediator =>
          isNormalMediator(mediator) &&
          (mediator.index.pageId !== action.payload.pageId ||
            mediator.index.bookPath !== action.payload.bookPath),
      );
    case 'UPDATE_PAGE':
      return (state ?? [])
        .filter(isMediator)
        .map(mediator =>
          isNormalMediator(mediator) &&
          isNormalMediator(action.payload) &&
          mediator.index.pageId === action.payload.index.pageId &&
          mediator.index.bookPath === action.payload.index.bookPath
            ? action.payload
            : mediator,
        );
    case 'UPDATE_PAGE_WITH_INDEX':
      return (state ?? [])
        .filter(isMediator)
        .map((mediator, index) =>
          index === action.index ? action.payload : mediator,
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
