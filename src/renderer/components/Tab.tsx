import TabUnstyled from '@mui/base/TabUnstyled';
import React from 'react';

import { useThemeStore } from '../contexts/themeContext';

interface TabProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  index: number;
  value: number;
}

function Tab(props: TabProps): JSX.Element {
  const theme = useThemeStore();
  const { children, onClick, value, index } = props;
  return (
    <TabUnstyled
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onClick={onClick}
      slotProps={{
        root: {
          className:
            value === index ? theme['Tab.selected'] : theme.Tab,
        },
      }}>
      {children}
    </TabUnstyled>
  );
}

export default Tab;
