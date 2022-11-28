import TabUnstyled from '@mui/base/TabUnstyled';
import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';

interface TabProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  index: number;
  value: number;
}

function Tab(props: TabProps): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  const { children, onClick, value, index } = props;
  return (
    <TabUnstyled
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onClick={onClick}
      slotProps={{
        root: {
          className:
            value === index ? theme.style['Tab.selected'] : theme.style.Tab,
        },
      }}>
      {children}
    </TabUnstyled>
  );
}

export default Tab;
