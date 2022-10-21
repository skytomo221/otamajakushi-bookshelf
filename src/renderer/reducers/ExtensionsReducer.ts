import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { ExtensionProperties } from '../../common/ExtensionProperties';
import { updateExtensionsAction } from '../actions/ExtensionsActions';

const updateExtensionsReducer = reducerWithInitialState<ExtensionProperties[]>([])
  .case(updateExtensionsAction, (_state, payload) => payload)
  .build();

export default updateExtensionsReducer;
