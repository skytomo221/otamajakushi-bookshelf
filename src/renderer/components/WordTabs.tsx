import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { SearchResult } from 'otamashelf/PageExplorer';
import { SearchCard } from 'otamashelf/SearchCard';
import * as React from 'react';
import { useState } from 'react';

import { BookTemplateMediator, Mediator, NormalMediator, PageTemplateMediator, isBookTemplateMediator, isNormalMediator, isPageTemplateMediator } from '../Mediator';
import { usePagesDispatch, usePagesStore } from '../contexts/pagesContext';
import { WordTabIndexContext } from '../contexts/wordTabIndexContext';
import { useWorkbenchDispatch } from '../contexts/workbenchContext';

import Tab from './Tab';
import TabPanel from './TabPanel';
import Tabs from './Tabs';
import TabsList from './TabsList';
import CardRenderer from './card-renderer/CardRenderer';

const { api } = window;

function CardRendererSwitcher({ mediator, index }: { mediator: Mediator, index: number }): JSX.Element {
  const dispatch = usePagesDispatch();
  const workbenchDispatch = useWorkbenchDispatch();
  const [newBookPath, setNewBookPath] = useState('');
  function createPage({ index: pageIndex, page }: PageTemplateMediator) {
    api.createPage(pageIndex, page).then((newMediator) => {
      dispatch({ type: 'REMOVE_PAGE', index });
      dispatch({ type: 'ADD_PAGE', payload: newMediator });
      workbenchDispatch({ type: 'ADD_INDEX', payload: { path: newMediator.index.bookPath, index: newMediator.index } });
    });
  }
  async function onWorkbenchInitialize(path: string, editable: boolean) {
    const pageFormats = await api.readAllPageFormats(path);
    const selectedPageFormatIndex = 0;
    const selectedPageFormat = pageFormats[selectedPageFormatIndex];
    const indexes = (pageFormats.length === 0) ? [] : await api.indexAllPages(path, selectedPageFormat);
    const searchResults = [] as (SearchCard & SearchResult)[];
    const searchCriteria = await api.readAllSearchCriteria();
    const selectedSearchCriterionIndex = 0;
    const searchScopes = await api.readAllSearchScopes(selectedPageFormat);
    const selectedSearchScopeIndex = 0;
    const searchWord = '';
    workbenchDispatch({
      type: 'ADD_WORKBENCH',
      payload: {
        path,
        editable,
        indexes,
        searchResults,
        pageFormats,
        selectedPageFormatIndex,
        searchCriteria,
        selectedSearchCriterionIndex,
        searchScopes,
        selectedSearchScopeIndex,
        searchWord,
      },
    });
  }
  function createBook({ index: pageIndex, page }: BookTemplateMediator) {
    api.createBook(pageIndex, page, newBookPath).then(() => {
      dispatch({ type: 'REMOVE_PAGE', index });
      onWorkbenchInitialize(newBookPath, true);
    });
  }
  async function showSaveDialogSync() {
    const filePath = await api.showSaveDialogSync();
    if (filePath) {
      setNewBookPath(filePath);
    }
  }
  if (isNormalMediator(mediator)) {
    return <WordTabIndexContext.Provider value={index}><CardRenderer
      page={mediator.page}
      index={mediator.index}
      layout={mediator.layout}
    /></WordTabIndexContext.Provider >;
  } if (isPageTemplateMediator(mediator)) {
    return <WordTabIndexContext.Provider value={index}>
      <CardRenderer
        page={mediator.page}
        index={mediator.index}
        layout={mediator.layout}
      />
      <button onClick={() => createPage(mediator)}>
        ページを作成する
      </button>
    </WordTabIndexContext.Provider>;
  } if (isBookTemplateMediator(mediator)) {
    return <WordTabIndexContext.Provider value={index}>
      <CardRenderer
        page={mediator.page}
        index={mediator.index}
        layout={mediator.layout}
      />
      <input
        type="text"
        value={newBookPath}
        onChange={(e) => setNewBookPath(e.target.value)}
      />
      <button onClick={showSaveDialogSync}>
        ファイル保存ダイアログを開く
      </button>
      <button onClick={() => createBook(mediator)}>
        ブックを作成する
      </button>
    </WordTabIndexContext.Provider >;
  }
  return <div>不明なMediatorです。</div>;
}

export default function WordTabs(): JSX.Element {
  const dispatch = usePagesDispatch();
  const [value, setValue] = useState(0);
  const selectedWords = usePagesStore();
  function removeSelectedWord(index: number) {
    dispatch({ type: 'REMOVE_PAGE', index });
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
                key={JSON.stringify(mediator.index)}
                onClick={() => setValue(index)}>
                {isNormalMediator(mediator) ? mediator.index.title : '新規'}
                <CloseIcon
                  fontSize="small"
                  onClick={() => {
                    removeSelectedWord(index);
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
            key={JSON.stringify(mediator.index)}>
            <CardRendererSwitcher mediator={mediator} index={index} />
          </TabPanel>
        ))}
      </Tabs>
    </Box>
  );
}
