import StyleThemeParameters from '../../common/StyleThemeParameters';
import defaultThemeParameters from '../../common/defaultThemeParameters';
import ThemeParameter from '../states/ThemeParameter';

import makeStore from './makeStore';

type State = {
  spacing: number;
  style: Required<StyleThemeParameters>;
};

type Action =
  | {
      type: 'CHANGE_THEME';
      payload: State;
    }
  | {
      type: 'APPLY_STYLE_THEME';
      payload: {
        style: ThemeParameter;
      };
    };

const initialState: State = {
  spacing: 8,
  style: defaultThemeParameters,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        ...action.payload,
      };
    case 'APPLY_STYLE_THEME':
      return {
        ...state,
        style: {
          ...state.style,
          ...action.payload.style,
        },
      };
    default:
      return state;
  }
};

const [ThemeProvider, useThemeStore, useThemeDispatch] = makeStore(
  reducer,
  initialState,
);

export { ThemeProvider, useThemeStore, useThemeDispatch };
