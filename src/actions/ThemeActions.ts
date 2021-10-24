import { actionCreatorFactory } from 'typescript-fsa';

import { ThemeExtension } from '../extension/theme';

const actionCreator = actionCreatorFactory('change-theme');

export const changeThemeAction = actionCreator<Partial<ThemeExtension>>(
  'change-theme',
);

export default changeThemeAction;
