import { reducerWithInitialState } from 'typescript-fsa-reducers';

import {
  addWorkbenchAction,
  editBookAction,
  removeWorkbenchAction,
  updateWorkbenchAction,
} from '../actions/WorkbenchesActions';
import Workbench from '../states/Workbench';

const workbenchesReducer = reducerWithInitialState<Workbench[]>([])
  .case(addWorkbenchAction, (state, payload) => [...state, payload])
  .case(editBookAction, (state, payload) =>
    state.map(workbench =>
      workbench.book.path === payload.path
        ? {
            ...workbench,
            book: { ...workbench.book, editable: payload.editable },
          }
        : workbench,
    ),
  )
  .case(removeWorkbenchAction, (state, payload) =>
    state.filter(workbench => workbench.book.path !== payload),
  )
  .case(updateWorkbenchAction, (state, payload) =>
    state.map(workbench =>
      workbench.book.path === payload.path
        ? { ...workbench, ...payload.partial }
        : workbench,
    ),
  )
  .build();

export default workbenchesReducer;
