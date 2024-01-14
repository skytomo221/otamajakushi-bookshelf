import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VList } from 'virtua';

import SearchProperties from '../../common/SearchProperties';
import { Mediator } from '../Mediator';
import { SummaryWord } from '../SummaryWord';
import {
  deleteSelectedWordAction,
  fetchSelectedWordAction,
} from '../actions/SelectedWordsActions';
import {
  updatePageExplorerAction,
  updateSearchModeAction,
  updateSearchWordAction,
} from '../actions/WorkbenchesActions';
import PrimarySidebarState from '../states/PrimarySidebarState';
import { State } from '../states/State';
import '../renderer';
import ThemeParameter from '../states/ThemeParameter';
import Workbench from '../states/Workbench';

import CardRenderer from './card-renderer/CardRenderer';

const { api } = window;

export const primarySidebarWidth = 240;

function Index(): JSX.Element {
  const dispatch = useDispatch();
  const primarySidebar = useSelector<State, PrimarySidebarState>(
    (state: State) => state.primarySidebar,
  );
  const workbenches = useSelector<State, Workbench[]>(
    (state: State) => state.workbenches,
  );
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  const onSelectedWordFetch = React.useCallback((selectedWord: SummaryWord) => {
    dispatch(fetchSelectedWordAction(selectedWord));
  }, []);
  const onMediatorsUpdate = React.useCallback(() => {
    dispatch(updateSearchWordAction(searchWord));
  }, []);
  const selectedWords = useSelector<State, null | Mediator[]>(
    (state: State) => state.selectedWords,
  );
  const onDelete = React.useCallback((summary: SummaryWord) => {
    dispatch(deleteSelectedWordAction(summary));
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
          <div key={template.id} className={theme.style['Index.li']}>
            <button
              className={theme.style['Index.button']}
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
        <div key={mediator.summary.id} className={theme.style['Index.li']}>
          <button
            aria-label={mediator.word.title}
            className={theme.style['Index.button']}
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
  const dispatch = useDispatch();
  const primarySidebar = useSelector<State, PrimarySidebarState>(
    (state: State) => state.primarySidebar,
  );
  const workbenches = useSelector<State, Workbench[]>(
    (state: State) => state.workbenches,
  );
  const onPageExplorerUpdate = React.useCallback(
    (pageExplorer: SearchProperties) => {
      dispatch(updatePageExplorerAction(pageExplorer));
    },
    [],
  );
  const onSearchModeUpdate = React.useCallback((searchMode: string) => {
    dispatch(updateSearchModeAction(searchMode));
  }, []);
  const onSearchWordUpdate = React.useCallback((sw: string) => {
    dispatch(updateSearchWordAction(sw));
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
