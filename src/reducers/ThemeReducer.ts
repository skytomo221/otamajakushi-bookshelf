import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { changeThemeAction } from '../actions/ThemeActions';
import defaultLightTheme from '../extension/defaultLightTheme';
import { ThemeExtension } from '../extension/theme';

const initTheme: ThemeExtension = defaultLightTheme();

const themeReducer = reducerWithInitialState<ThemeExtension>(initTheme)
  .case(changeThemeAction, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .build();

export default themeReducer;
