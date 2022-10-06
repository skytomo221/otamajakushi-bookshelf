import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';

import { addBookAction } from '../actions/BookshelfActions';

import { OtamaMenu } from './OtamaMenu';

import '../renderer';

const { api } = window;

export default function FileMenu(): JSX.Element {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <OtamaMenu
      menuItems={[
        {
          key: 'new',
          name: '辞書の新規作成',
        },
        {
          key: 'open',
          name: '辞書を開く',
          onClick: () => {
            api
              .fileOpen()
              .then(data => {
                switch (data.status) {
                  case 'cancel':
                    return false;
                  case 'failure':
                    enqueueSnackbar(
                      `ファイルが開けませんでした\n${data.message}`,
                    );
                    return false;
                  case 'success':
                    data.paths.forEach(path =>
                      dispatch(
                        addBookAction({
                          path,
                          editable: false,
                        }),
                      ),
                    );
                    return true;
                  default:
                    return false;
                }
              })
              .catch(err => {
                if ('at' in err && 'kind' in err && 'message' in err) {
                  enqueueSnackbar(
                    `場所：${err.at}, 種類：${err.kind}, エラーメッセージ：${err.message}`,
                  );
                } else {
                  enqueueSnackbar('原因不明のエラー');
                }
              });
          },
        },
        {
          key: 'divider',
          name: 'divider',
        },
        {
          key: 'exit',
          name: '終了',
          onClick: api.windowClose,
        },
      ]}
    />
  );
}
