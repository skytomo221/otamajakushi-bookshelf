import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../states/State';

export const primarySidebarWidth = 240;

export default function PrimarySidebar(): JSX.Element {
  const theme = useTheme();
  const primarySidebar = useSelector<State, null | string>(
    (state: State) => state.primarySidebar,
  );
  const open = primarySidebar !== null;

  return (
    <Drawer
      sx={{
        width: primarySidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          marginLeft: `calc(${theme.spacing(8)} + 1px)`,
          width: primarySidebarWidth,
          boxSizing: 'border-box',
          zIndex: 1199,
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
