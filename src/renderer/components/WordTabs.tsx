import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LayoutCard } from '../LayoutCard';
import { SummaryWord } from '../SummaryWord';
import { removeSelectedWordAction } from '../actions/SelectedWordsActions';
import Book from '../states/Book';
import { State } from '../states/State';

import CardRenderer from './CardRenderer';

const { api } = window;

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function WordTabs() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const selectedWords = useSelector<State, null | LayoutCard[]>(
    (state: State) => state.selectedWords,
  );
  const removeSelectedWord = useCallback((selectedWord: LayoutCard) => {
    dispatch(removeSelectedWordAction(selectedWord));
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          {selectedWords?.map(card => (
            <Tab
              label={card.word.form}
              icon={
                <CloseIcon
                  fontSize="small"
                  onClick={() => {
                    removeSelectedWord(card);
                  }}
                />
              }
              iconPosition="end"
              key={`${card.word.bookPath}/${card.word.id}`}
            />
          ))}
        </Tabs>
      </Box>
      {(selectedWords ?? []).map((card, index) => (
        <TabPanel
          value={value}
          index={index}
          key={`${card.word.bookPath}/${card.word.id}`}>
          <CardRenderer card={card} />
        </TabPanel>
      ))}
    </Box>
  );
}
