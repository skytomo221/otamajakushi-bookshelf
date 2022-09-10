import {
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

import { windowClose } from '../windowControl';

export default function FileMenu(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const items: (
    | 'divider'
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
  )[] = [
    {
      key: 'new',
      name: '辞書の新規作成',
    },
    {
      key: 'open',
      name: '辞書を開く',
    },
    'divider',
    {
      key: 'exit',
      name: '終了',
      onClick: windowClose,
    },
  ];

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
        {items.map(item => {
          if (item === 'divider') {
            return <Divider />;
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
