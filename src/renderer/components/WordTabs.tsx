import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeSelectedWordAction } from '../actions/SelectedWordsActions';
import Book from '../states/Book';
import SelectedWord from '../states/SelectedWord';
import { State } from '../states/State';

import WordCard from './WordCard';

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
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const books = useSelector<State, Book[]>(
    (state: State) => state.bookshelf.books,
  );
  const selectedWords = useSelector<State, null | SelectedWord[]>(
    (state: State) => state.selectedWords,
  );
  const removeSelectedWord = React.useCallback((selectedWord: SelectedWord) => {
    dispatch(removeSelectedWordAction(selectedWord));
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          {selectedWords?.map(({ id, path }) => {
            const word = books
              .find(book => book.path === path)
              ?.dictionary.words.find(w => w.entry.id === id);
            return (
              <Tab
                label={word?.entry.form}
                icon={
                  <CloseIcon
                    fontSize="small"
                    onClick={() => {
                      removeSelectedWord({ id, path });
                    }}
                  />
                }
                iconPosition="end"
                key={`${path}/${id}`}
              />
            );
          })}
        </Tabs>
      </Box>
      {selectedWords?.map(({ id, path }, index) => {
        const word = books
          .find(book => book.path === path)
          ?.dictionary?.words?.find(w => w.entry.id === id);
        return word ? (
          <TabPanel value={value} index={index} key={`${path}/${id}`}>
            <WordCard word={word} />
          </TabPanel>
        ) : (
          <></>
        );
      })}
    </Box>
  );
}
