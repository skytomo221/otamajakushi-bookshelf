import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Mediator } from '../../common/Mediator';
import { removeSelectedWordAction } from '../actions/SelectedWordsActions';
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
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ height: '100%', overflow: 'auto' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default function WordTabs() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const selectedWords = useSelector<State, null | Mediator[]>(
    (state: State) => state.selectedWords,
  );
  const removeSelectedWord = useCallback((selectedWord: Mediator) => {
    dispatch(removeSelectedWordAction(selectedWord));
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} sx={{ minHeight: 'auto' }}>
          {selectedWords?.map(mediator => (
            <Tab
              label={mediator.summary.form}
              sx={{ minHeight: '48px', textTransform: 'none' }}
              icon={
                <CloseIcon
                  fontSize="small"
                  onClick={() => {
                    removeSelectedWord(mediator);
                  }}
                />
              }
              iconPosition="end"
              key={`${mediator.summary.bookPath}/${mediator.summary.id}`}
            />
          ))}
        </Tabs>
      </Box>
      {(selectedWords ?? []).map((mediator, index) => (
        <TabPanel
          value={value}
          index={index}
          key={`${mediator.summary.bookPath}/${mediator.summary.id}`}>
          <CardRenderer
            word={mediator.word}
            summary={mediator.summary}
            layout={mediator.layout}
          />
        </TabPanel>
      ))}
    </Box>
  );
}
