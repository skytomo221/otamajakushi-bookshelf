import { ipcRenderer } from 'electron';

import { useSnackbar } from 'notistack';
import React from 'react';

import { windowClose } from '../windowControl';

import { OtamaMenu } from './OtamaMenu';

export default function FileMenu(): JSX.Element {
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
            ipcRenderer
              .invoke('file-open')
              .then(data => {
                if (data.status === undefined) {
                  return false;
                }
                if (!data.status) {
                  enqueueSnackbar(`ファイルが開けませんでした\n${data.message}`);
                  return false;
                }
                return true;
              })
              .catch(err => {
                // eslint-disable-next-line no-console
                console.log(err);
                if ('at' in err && 'kind' in err && 'message' in err) {
                  enqueueSnackbar(
                    `場所：${err.at}, 種類：${err.kind}, エラーメッセージ：${err.message}`,
                  );
                } else {
                  enqueueSnackbar('原因不明のエラー');
                }
              });
          }},
        'divider',
        {
          key: 'exit',
          name: '終了',
          onClick: windowClose,
        },
      ]}
    />
  );
}
