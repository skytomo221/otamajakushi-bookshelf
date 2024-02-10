import StyleThemeParameters from '../../common/StyleThemeParameters';
import defaultThemeParameters from '../../common/defaultThemeParameters';

import makeStore from './makeStore';

type State = Required<StyleThemeParameters>;

type Action =
  | {
      type: 'CHANGE_THEME';
      payload: State;
    };

const initialState: State = defaultThemeParameters;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return action.payload;
    default:
      return state;
  }
};

const [ThemeProvider, useThemeStore, useThemeDispatch] = makeStore(
  reducer,
  initialState,
);

export { ThemeProvider, useThemeStore, useThemeDispatch };
