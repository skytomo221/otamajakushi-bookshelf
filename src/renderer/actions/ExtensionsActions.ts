import { actionCreatorFactory } from 'typescript-fsa';

import { ExtensionInfo } from '../../common/ExtensionInfo';

const actionCreator = actionCreatorFactory('extensions-action');

export const updateExtensionsAction =
  actionCreator<ExtensionInfo[]>('extensions/update');

export default updateExtensionsAction;
