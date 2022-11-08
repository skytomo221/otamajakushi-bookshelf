import { reducerWithInitialState } from 'typescript-fsa-reducers';

import OtamaDefaultTheme from '../../main/OtamaDefaultTheme';
import {
  applyStyleThemeAction,
  changeThemeAction,
} from '../actions/ThemeActions';
import ThemeParameter from '../states/ThemeParameter';

const initTheme: ThemeParameter = {
  spacing: 8,
  style: new OtamaDefaultTheme().style(),
};

const themeReducer = reducerWithInitialState<ThemeParameter>(initTheme)
  .case(changeThemeAction, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(applyStyleThemeAction, (state, style) => ({
    ...state,
    style,
  }))
  .build();

export default themeReducer;
