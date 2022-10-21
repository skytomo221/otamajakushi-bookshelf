import { actionCreatorFactory } from 'typescript-fsa';

import { ExtensionProperties } from '../../common/ExtensionProperties';

const actionCreator = actionCreatorFactory('extensions-action');

export const updateExtensionsAction =
  actionCreator<ExtensionProperties[]>('extensions/update');

export default updateExtensionsAction;
