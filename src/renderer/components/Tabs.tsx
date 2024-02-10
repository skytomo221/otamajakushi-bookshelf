import TabsUnstyled, { TabsUnstyledProps } from '@mui/base/TabsUnstyled';
import React from 'react';

import { useThemeStore } from '../contexts/themeContext';

// eslint-disable-next-line react/display-name
const Tabs = React.forwardRef(
  (props: TabsUnstyledProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const theme = useThemeStore();
    return (
      <TabsUnstyled
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        slotProps={{
          root: {
            className: theme.Tabs,
          },
        }}
        ref={ref}
      />
    );
  },
);

export default Tabs;
