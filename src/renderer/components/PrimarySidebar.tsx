import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchProperties from '../../common/SearchProperties';
import { Mediator } from '../Mediator';
import { SummaryWord } from '../SummaryWord';
import {
  updatePrimarySidebarAction,
  updateSearchWordAction,
} from '../actions/PrimarySidebarActions';
import {
  deleteSelectedWordAction,
  fetchSelectedWordAction,
} from '../actions/SelectedWordsActions';
import Book from '../states/Book';
import PrimarySidebarState from '../states/PrimarySidebarState';
import { State } from '../states/State';
import '../renderer';
import ThemeParameter from '../states/ThemeParameter';

import CardRenderer from './card-renderer/CardRenderer';

const { api } = window;

export const primarySidebarWidth = 240;

function Index(): JSX.Element {
  const dispatch = useDispatch();
  const primarySidebar = useSelector<State, PrimarySidebarState | null>(
    (state: State) => state.primarySidebar,
  );
  if (primarySidebar === null) {
    return <></>;
  }
  const { book, templates, mediators } = primarySidebar;
  const { editable } = book;
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  const onSelectedWordFetch = React.useCallback((selectedWord: SummaryWord) => {
    dispatch(fetchSelectedWordAction(selectedWord));
  }, []);
  const onMediatorsUpdate = React.useCallback(
    (ms: Mediator[]) => dispatch(updatePrimarySidebarAction({ mediators: ms })),
    [],
  );
  const selectedWords = useSelector<State, null | Mediator[]>(
    (state: State) => state.selectedWords,
  );
  const onDelete = React.useCallback((summary: SummaryWord) => {
    dispatch(deleteSelectedWordAction(summary));
  }, []);

  return (
    <>
      {editable &&
        (templates ?? []).map(template => (
          <li key={template.id} className={theme.style['Index.li']}>
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
          </li>
        ))}
      {(mediators ?? []).map(mediator => (
        <li key={mediator.summary.id} className={theme.style['Index.li']}>
          <button
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
              className="flex"
              onClick={() => {
                onDelete(mediator.summary);
                onMediatorsUpdate(
                  mediators?.filter(m => m.summary.id !== mediator.summary.id),
                );
              }}>
              <DeleteIcon />
            </button>
          )}
        </li>
      ))}
    </>
  );
}

export default function PrimarySidebar(): JSX.Element {
  const dispatch = useDispatch();
  const books = useSelector<State, Book[]>(
    (state: State) => state.bookshelf.books,
  );
  const primarySidebar = useSelector<State, null | PrimarySidebarState>(
    (state: State) => state.primarySidebar,
  );
  const onPageExplorerUpdate = React.useCallback(
    (pageExplorer: SearchProperties) => {
      dispatch(updatePrimarySidebarAction({ pageExplorer }));
    },
    [],
  );
  const onSearchModeUpdate = React.useCallback((searchMode: string) => {
    dispatch(updatePrimarySidebarAction({ searchMode }));
  }, []);
  const onSearchWordUpdate = React.useCallback((searchWord: string) => {
    dispatch(updateSearchWordAction(searchWord));
  }, []);

  if (primarySidebar) {
    const { pageExplorers, searchModes, searchWord } = primarySidebar;
    return books.some(b => b.path === primarySidebar.book.path) ? (
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
          <ul>
            <Index />
          </ul>
        </div>
      </div>
    ) : (
      <></>
    );
  }
  return <></>;
}
