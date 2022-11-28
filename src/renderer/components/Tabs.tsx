import TabsUnstyled, { TabsUnstyledProps } from '@mui/base/TabsUnstyled';
import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';

// eslint-disable-next-line react/display-name
const Tabs = React.forwardRef(
  (props: TabsUnstyledProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const theme = useSelector<State, ThemeParameter>(state => state.theme);
    return (
      <TabsUnstyled
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        slotProps={{
          root: {
            className: theme.style.Tabs,
          },
        }}
        ref={ref}
      />
    );
  },
);

export default Tabs;
