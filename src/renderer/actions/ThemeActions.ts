import { actionCreatorFactory } from 'typescript-fsa';

import StyleThemeParameters from '../../common/StyleThemeParameters';
import ThemeParameter from '../states/ThemeParameter';

const actionCreator = actionCreatorFactory('change-theme');

export const changeThemeAction = actionCreator<ThemeParameter>('change-theme');

export const applyStyleThemeAction =
  actionCreator<StyleThemeParameters>('apply-style-theme');

export default changeThemeAction;
