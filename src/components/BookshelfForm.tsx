import { Button, TextField } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeBookshelfAction } from '../actions/BookshelfActions';
import IBookshelf from '../states/IBookshelf';
import { IState } from '../states/IState';

// データは、Storeから渡されるので、プロパティは必要ありません。
const BookshelfForm: React.FC = () => {
  // useSelector でステートの変更を受け取れます。
  const { books } = useSelector<IState, IBookshelf>((a: IState) => a.bookshelf); // -- (a)
  const dispatch = useDispatch(); // -- (b)
  const onBookChange = useCallback((value: string) => {
    // 名前を変更したとき(タイプするたび)のイベント
    dispatch(changeBookshelfAction({}));
  }, []); // [] は初回のみという意味
  const onCountClick = useCallback(() => {
    // 訪問ボタンを押したときのイベント
    dispatch(changeBookshelfAction({}));
    // 関数外の変数は、関数が(再)定義されたときのものに固定化されるので、
    // 関数外の変数を使用するときには、下記のように第2引数の配列にそれを指定して、
    // それが変更されたときに再定義されるようにする
  }, []);
  return (
    <div>
      <p>
        <TextField label="ユーザー名" />
      </p>
      <p>
        <Button>訪問</Button>
      </p>
    </div>
  );
};

export default BookshelfForm;
