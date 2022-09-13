import { actionCreatorFactory } from 'typescript-fsa';

import ThemeParameter from '../states/ThemeParameter';

const actionCreator = actionCreatorFactory('change-theme');

export const changeThemeAction =
  actionCreator<ThemeParameter>('change-theme');

export default changeThemeAction;
