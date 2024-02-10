import TabsListUnstyled, {
  TabsListUnstyledProps,
} from '@mui/base/TabsListUnstyled';
import React from 'react';

import { useThemeStore } from '../contexts/themeContext';

// eslint-disable-next-line react/display-name
const TabsList = React.forwardRef(
  (props: TabsListUnstyledProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const theme = useThemeStore();
    return (
      <TabsListUnstyled
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        slotProps={{
          root: {
            className: theme.TabsList,
          },
        }}
        ref={ref}
      />
    );
  },
);

export default TabsList;
