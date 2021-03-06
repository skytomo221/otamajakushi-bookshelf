import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { changeBookshelfAction } from '../actions/BookshelfActions';
import IBookshelf from '../states/IBookshelf';

const initBookshelf: IBookshelf = {
  books: [],
};

const bookshelfReducer = reducerWithInitialState<IBookshelf>(initBookshelf)
  // Action ごとに`.case`をメソッドチェーンでつなぐ
  // 1番目の引数は、アクション、2番めが処理の関数
  // 処理の関数の引数は、1番目が変更前の State、2番めが Action の値
  // 必ず、Stateと同じ型(ここでは、IUser)のオブジェクトを return する必要がある。
  // payload はここでは、Actionで指定した`Partial<IUser>`の型のオブジェクト。
  .case(changeBookshelfAction, (state, payload) => ({
    ...state,
    ...payload,
  }))
  // 上は、下記と同じ意味
  // const user = Object.assign({}, state, payload);
  // return user;
  .build();

export default bookshelfReducer;
