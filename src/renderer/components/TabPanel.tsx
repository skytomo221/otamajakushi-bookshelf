import React from 'react';

import { useThemeStore } from '../contexts/themeContext';

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const theme = useThemeStore();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={theme.style.TabPanel}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}>
      {value === index && children}
    </div>
  );
}

export default TabPanel;
