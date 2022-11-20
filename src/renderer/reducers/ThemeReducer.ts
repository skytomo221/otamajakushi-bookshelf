import { reducerWithInitialState } from 'typescript-fsa-reducers';

import defaultThemeParameters from '../../common/defaultThemeParameters';
import {
  applyStyleThemeAction,
  changeThemeAction,
} from '../actions/ThemeActions';
import ThemeParameter from '../states/ThemeParameter';

const initTheme: ThemeParameter = {
  spacing: 8,
  style: defaultThemeParameters,
};

const themeReducer = reducerWithInitialState<ThemeParameter>(initTheme)
  .case(changeThemeAction, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(applyStyleThemeAction, (state, style) => ({
    ...state,
    style: {
      ...state.style,
      ...style,
    },
  }))
  .build();

export default themeReducer;
