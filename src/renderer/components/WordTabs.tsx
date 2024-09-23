import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useState } from 'react';

import { Mediator } from '../Mediator';
import { usePagesDispatch, usePagesStore } from '../contexts/pagesContext';

import Tab from './Tab';
import TabPanel from './TabPanel';
import Tabs from './Tabs';
import TabsList from './TabsList';
import CardRenderer from './card-renderer/CardRenderer';

export default function WordTabs(): JSX.Element {
  const dispatch = usePagesDispatch();
  const [value, setValue] = useState(0);
  const selectedWords = usePagesStore();
  function removeSelectedWord(selectedWord: Mediator) {
    dispatch({ type: 'REMOVE_PAGE', payload: selectedWord.index });
  };

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
                key={`${mediator.index.bookPath}/${mediator.index.pageId}`}
                onClick={() => setValue(index)}>
                {mediator.index.title}
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
            key={`${mediator.index.bookPath}/${mediator.index.pageId}`}>
            <CardRenderer
              page={mediator.page}
              index={mediator.index}
              layout={mediator.layout}
            />
          </TabPanel>
        ))}
      </Tabs>
    </Box>
  );
}
