import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { ExtensionInfo } from '../ExtensionInfo';
import { updateExtensionsAction } from '../actions/ExtensionsActions';

const updateExtensionsReducer = reducerWithInitialState<ExtensionInfo[]>([])
  .case(updateExtensionsAction, (_state, payload) => payload)
  .build();

export default updateExtensionsReducer;
