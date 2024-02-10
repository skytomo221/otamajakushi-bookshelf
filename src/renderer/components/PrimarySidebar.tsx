import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import { VList } from 'virtua';

import SearchProperties from '../../common/SearchProperties';
import { SummaryWord } from '../SummaryWord';

import '../renderer';
import { usePagesDispatch, usePagesStore } from '../contexts/pagesContext';
import { usePrimarySidebarStore } from '../contexts/primarySidebarContext';
import { useThemeStore } from '../contexts/themeContext';
import {
  useWorkbenchDispatch,
  useWorkbenchStore,
} from '../contexts/workbenchContext';

import CardRenderer from './card-renderer/CardRenderer';

const { api } = window;

export const primarySidebarWidth = 240;

function Index(): JSX.Element {
  const primarySidebar = usePrimarySidebarStore();
  const workbenches = useWorkbenchStore();
  const theme = useThemeStore();
  const pageDispatch = usePagesDispatch();
  const workbenchDispatch = useWorkbenchDispatch();
  function onSelectedWordFetch(summary: SummaryWord) {
    api.readPage(summary).then(mediator => {
      pageDispatch({ type: 'ADD_PAGE', payload: mediator });
    });
  }
  function onMediatorsUpdate() {
    const { bookPath } = primarySidebar;
    if (bookPath === null) {
      return;
    }
    workbenchDispatch({
      type: 'UPDATE_WORKBENCH',
      payload: { path: bookPath, partial: { searchWord } },
    });
    const workbench = workbenches.find(w => w.book.path === bookPath);
    if (workbench === undefined) {
      throw new Error('workbench is null');
    }
    api
      .selectPage(
        workbench.book.path,
        workbench.pageExplorer.id,
        workbench.searchMode,
        workbench.searchWord,
      )
      .then(mediators => {
        workbenchDispatch({
          type: 'UPDATE_WORKBENCH',
          payload: { path: bookPath, partial: { mediators } },
        });
      });
  }
  const selectedWords = usePagesStore();
  const onDelete = React.useCallback((summary: SummaryWord) => {
    api.deletePage(summary);
    pageDispatch({ type: 'REMOVE_PAGE', payload: summary });
  }, []);
  const workbench = workbenches.find(
    w => w.book.path === primarySidebar.bookPath,
  );
  if (
    !primarySidebar.display ||
    primarySidebar.bookPath === null ||
    workbench === undefined
  ) {
    return <></>;
  }
  const { book, templates, mediators, searchWord } = workbench;
  const { editable } = book;

  return (
    <VList>
      {editable &&
        (templates ?? []).map(template => (
          <div key={template.id} className={theme['Index.li']}>
            <button
              className={theme['Index.button']}
              onClick={async () => {
                const newPage = await api.createPage(book.path, template.id);
                onSelectedWordFetch(newPage.summary);
              }}
              type="button">
              <AddIcon fontSize="small" />
              {template.name}
            </button>
          </div>
        ))}
      {(mediators ?? []).map(mediator => (
        <div key={mediator.summary.id} className={theme['Index.li']}>
          <button
            aria-label={mediator.word.title}
            className={theme['Index.button']}
            onClick={() => {
              if (
                (selectedWords ?? []).every(
                  m =>
                    m.summary.id !== mediator.summary.id ||
                    m.summary.bookPath !== book.path,
                )
              ) {
                onSelectedWordFetch(mediator.summary);
              }
            }}
            type="button">
            <CardRenderer
              word={mediator.word}
              summary={mediator.summary}
              layout={mediator.layout}
            />
          </button>
          {editable && (
            <button
              type="button"
              aria-label={mediator.word.title}
              className="flex"
              onClick={() => {
                onDelete(mediator.summary);
                onMediatorsUpdate();
              }}>
              <DeleteIcon />
            </button>
          )}
        </div>
      ))}
    </VList>
  );
}

export default function PrimarySidebar(): JSX.Element {
  const primarySidebar = usePrimarySidebarStore();
  const workbenches = useWorkbenchStore();
  const workbenchDispatch = useWorkbenchDispatch();
  const workbench = workbenches.find(
    w => w.book.path === primarySidebar.bookPath,
  );
  if (
    !primarySidebar.display ||
    primarySidebar.bookPath === null ||
    workbench === undefined
  ) {
    return <></>;
  }
  const bookPath = workbench.book.path;
  function onPageExplorerUpdate(pageExplorer: SearchProperties) {
    workbenchDispatch({
      type: 'UPDATE_WORKBENCH',
      payload: { path: bookPath, partial: { pageExplorer } },
    });
  }
  function onSearchModeUpdate(searchMode: string) {
    workbenchDispatch({
      type: 'UPDATE_WORKBENCH',
      payload: { path: bookPath, partial: { searchMode } },
    });
  }
  function onSearchWordUpdate(sw: string) {
    workbenchDispatch({
      type: 'UPDATE_WORKBENCH',
      payload: { path: bookPath, partial: { searchWord: sw } },
    });
  }

  const { pageExplorers, searchModes, searchWord } = workbench;

  return (
    <div className="flex flex-col h-full">
      <input
        className="bg-transparent m-0.5 w-full"
        value={searchWord}
        onChange={event => onSearchWordUpdate(event.target.value)}
        id="standard-basic"
      />
      <div className="text-xs">検索範囲</div>
      <select
        onChange={event => {
          onSearchModeUpdate(event.target.value);
        }}>
        {searchModes.map(mode => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>
      <div className="text-xs">検索方式</div>
      <select
        onChange={event => {
          onPageExplorerUpdate(
            pageExplorers.find(p => p.id === event.target.value) ?? {
              id: '',
              displayName: '',
            },
          );
        }}>
        {pageExplorers.map(explorer => (
          <option key={explorer.id} value={explorer.id}>
            {explorer.displayName}
          </option>
        ))}
      </select>
      <div className="grow overflow-auto">
        <Index />
      </div>
    </div>
  );
}
