import MenuUnstyled, { MenuUnstyledProps } from '@mui/base/MenuUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';

const defaultListbox = '';
const defaultRoot = 'bg-slate-50 drop-shadow-xl rounded px-2 py-1';

// eslint-disable-next-line react/display-name
const Menu = React.forwardRef(
  (props: MenuUnstyledProps, ref: React.ForwardedRef<HTMLUListElement>) => {
    const theme = useSelector<State, ThemeParameter>(state => state.theme);
    return (
      <MenuUnstyled
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        components={{ Root: PopperUnstyled, Listbox: 'ul' }}
        componentsProps={{
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
