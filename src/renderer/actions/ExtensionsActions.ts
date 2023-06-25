import { ExtensionProperties } from 'otamashelf';
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('extensions-action');

export const updateExtensionsAction =
  actionCreator<ExtensionProperties[]>('extensions/update');

export default updateExtensionsAction;
