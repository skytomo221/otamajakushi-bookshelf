import React from 'react';

import { windowClose } from '../windowControl';

import { OtamaMenu } from './OtamaMenu';

export default function FileMenu(): JSX.Element {
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
        },
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
