import { reducerWithInitialState } from 'typescript-fsa-reducers';

import {
  applyStyleThemeAction,
  changeThemeAction,
} from '../actions/ThemeActions';
import ThemeParameter from '../states/ThemeParameter';

const initTheme: ThemeParameter = {
  spacing: 8,
  style: {
    main: '',
    menuBar: '',
    statuBar: '',
    editor: '',
    h2: 'text-5xl',
    h3: 'text-4xl',
    h4: 'text-3xl',
    h5: 'text-2xl',
    h6: 'text-xl',
    lg: 'text-lg',
    base: 'text-base',
  },
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
