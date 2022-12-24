import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Mediator } from '../Mediator';
import { removeSelectedWordAction } from '../actions/SelectedWordsActions';
import { State } from '../states/State';

import Tab from './Tab';
import TabPanel from './TabPanel';
import Tabs from './Tabs';
import TabsList from './TabsList';
import CardRenderer from './card-renderer/CardRenderer';

export default function WordTabs(): JSX.Element {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const selectedWords = useSelector<State, null | Mediator[]>(
    (state: State) => state.selectedWords,
  );
  const removeSelectedWord = useCallback((selectedWord: Mediator) => {
    dispatch(removeSelectedWordAction(selectedWord.summary));
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
      <Tabs defaultValue={0}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabsList>
            {selectedWords?.map((mediator, index) => (
              <Tab
                index={index}
                value={value}
                key={`${mediator.summary.bookPath}/${mediator.summary.id}`}
                onClick={() => setValue(index)}>
                {mediator.word.title}
                <CloseIcon
                  fontSize="small"
                  onClick={() => {
                    removeSelectedWord(mediator);
                  }}
                />
              </Tab>
            ))}
          </TabsList>
        </Box>
        {(selectedWords ?? []).map((mediator, index) => (
          <TabPanel
            index={index}
            value={value}
            key={`${mediator.summary.bookPath}/${mediator.summary.id}`}>
            <CardRenderer
              word={mediator.word}
              summary={mediator.summary}
              layout={mediator.layout}
            />
          </TabPanel>
        ))}
      </Tabs>
    </Box>
  );
}
