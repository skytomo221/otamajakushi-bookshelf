import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { changeThemeAction } from '../actions/ThemeActions';
import ThemeParameter from '../states/ThemeParameter';

const initTheme: ThemeParameter = {
  spacing: 8,
};

const themeReducer = reducerWithInitialState<ThemeParameter>(initTheme)
  .case(changeThemeAction, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .build();

export default themeReducer;
