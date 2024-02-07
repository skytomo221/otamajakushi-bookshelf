import MenuUnstyled, { MenuUnstyledProps } from '@mui/base/MenuUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import React from 'react';

import { useThemeStore } from '../contexts/themeContext';

const defaultListbox = '';
const defaultRoot = 'bg-slate-50 drop-shadow-xl rounded px-2 py-1';

// eslint-disable-next-line react/display-name
const Menu = React.forwardRef(
  (props: MenuUnstyledProps, ref: React.ForwardedRef<HTMLUListElement>) => {
    const theme = useThemeStore();
    return (
      <MenuUnstyled
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        slots={{ root: PopperUnstyled, listbox: 'ul' }}
        slotProps={{
          listbox: {
            className: theme.style['Menu.listbox'] ?? defaultListbox,
          },
          root: {
            className: theme.style['Menu.root'] ?? defaultRoot,
          },
        }}
        ref={ref}
      />
    );
  },
);

export default Menu;
