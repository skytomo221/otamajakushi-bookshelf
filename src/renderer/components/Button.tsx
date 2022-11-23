import ButtonUnstyled, {
  ButtonUnstyledProps,
} from '@mui/base/ButtonUnstyled';
import * as React from 'react';

// eslint-disable-next-line react/display-name
const Button = React.forwardRef(
  (props: ButtonUnstyledProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
    <ButtonUnstyled
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      componentsProps={{
        root: {
          className: `flex items-center justify-center`,
        },
      }}
      ref={ref}
    />
  ),
);

export default Button;
