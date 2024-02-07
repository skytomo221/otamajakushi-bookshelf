import React, { createContext, useContext, useReducer } from 'react';

export default function makeStore<S, A>(
  reducer: (state: S, action: A) => S,
  initialState: S,
): [
  ({ children }: { children: React.ReactNode }) => React.JSX.Element,
  () => S,
  () => React.Dispatch<A>,
] {
  const storeContext = createContext<S | undefined>(undefined);
  const dispatchContext = createContext<React.Dispatch<A> | undefined>(
    undefined,
  );

  const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={store}>{children}</storeContext.Provider>
      </dispatchContext.Provider>
    );
  };

  function useStore() {
    const store = useContext(storeContext);
    if (store === undefined) {
      throw new Error('useStore must be used within a StoreProvider');
    }
    return store;
  }
  function useDispatch() {
    const dispatch = useContext(dispatchContext);
    if (dispatch === undefined) {
      throw new Error('useDispatch must be used within a StoreProvider');
    }
    return dispatch;
  }

  return [StoreProvider, useStore, useDispatch];
}
