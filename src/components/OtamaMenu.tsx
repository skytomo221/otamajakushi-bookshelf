import {
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

export interface Props {
  menuItems: (
    | {
        key: string;
        name: string;
        onClick?: undefined;
      }
    | {
        key: string;
        name: string;
        onClick: () => void;
      }
  )[];
}

export function OtamaMenu({ menuItems }: Props): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();

  return (
    <div>
      <Button color="inherit" onClick={handleClick} sx={theme.button}>
        <Typography variant="button" noWrap>
          ファイル
        </Typography>
      </Button>
      <Menu
        id="file-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'file-button',
        }}>
        {menuItems.map((item) => {
          if (item.name === 'divider') {
            return <Divider key={item.key} />;
          }
          return (
            <MenuItem
              key={item.key}
              onClick={() => {
                handleClose();
                if (item.onClick) item.onClick();
              }}>
              {item.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
