import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';
import * as React from 'react';

// eslint-disable-next-line react/display-name
const MenuButton = React.forwardRef(
  (props: ButtonUnstyledProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
    <ButtonUnstyled
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      slotProps={{
        root: {
          className: `flex [-webkit-app-region:no-drag] p-1.5 text-sm`,
        },
      }}
      ref={ref}
    />
  ),
);

export default MenuButton;
