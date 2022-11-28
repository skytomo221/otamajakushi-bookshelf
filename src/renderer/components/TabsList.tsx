import TabsListUnstyled, {
  TabsListUnstyledProps,
} from '@mui/base/TabsListUnstyled';
import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';

// eslint-disable-next-line react/display-name
const TabsList = React.forwardRef(
  (props: TabsListUnstyledProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const theme = useSelector<State, ThemeParameter>(state => state.theme);
    return (
      <TabsListUnstyled
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        slotProps={{
          root: {
            className: theme.style.TabsList,
          },
        }}
        ref={ref}
      />
    );
  },
);

export default TabsList;
