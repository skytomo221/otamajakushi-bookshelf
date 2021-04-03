import { Word } from 'otamajakushi/dist/Word';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { changeSelectedWordAction } from '../actions/SelectedWordActions';

const initWord: Word = {
  entry: {
    id: -1,
    form: '',
  },
  translations: [],
  tags: [],
  contents: [],
  variations: [],
  relations: [],
};

const searchWordReducer = reducerWithInitialState<Word>(initWord)
  .case(changeSelectedWordAction, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .build();

export default searchWordReducer;
