import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { SearchResult } from 'otamashelf/PageExplorer';
import { PageProperties } from 'otamashelf/PageProperties';
import * as React from 'react';
import { VList } from 'virtua';

import '../renderer';
import { usePagesDispatch, usePagesStore } from '../contexts/pagesContext';
import { usePrimarySidebarStore } from '../contexts/primarySidebarContext';
import { useThemeStore } from '../contexts/themeContext';
import {
  useWorkbenchDispatch,
  useWorkbenchStore,
} from '../contexts/workbenchContext';

const { api } = window;

export const primarySidebarWidth = 240;

function Indexes(): JSX.Element {
  const primarySidebar = usePrimarySidebarStore();
  const workbenches = useWorkbenchStore();
  const theme = useThemeStore();
  const pageDispatch = usePagesDispatch();
  const workbenchDispatch = useWorkbenchDispatch();
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  function onSelectedWordFetch(pageProperties: PageProperties) {
    api.readPage(pageProperties).then(result => {
      pageDispatch({
        type: 'ADD_PAGE',
        payload: { ...result, pageProperties },
      });
    });
  }
  function onIndexesUpdate() {
    const { path: bookPath } = primarySidebar;
    if (bookPath === null) {
      return;
    }
    const workbench = workbenches.find(w => w.path === bookPath);
    if (workbench === undefined) {
      throw new Error('workbench is null');
    }
    const {
      path,
      pageFormats,
      searchScopes,
      searchCriteria,
      searchWord,
      selectedPageFormatIndex,
      selectedSearchScopeIndex,
      selectedSearchCriterionIndex,
    } = workbench;
    const pageFormat = pageFormats[selectedPageFormatIndex];
    const searchScope = searchScopes[selectedSearchScopeIndex];
    const searchCriterion = searchCriteria[selectedSearchCriterionIndex];
    api
      .searchPage(
        path,
        pageFormat,
        searchScope.id,
        searchCriterion.id,
        searchWord,
      )
      .then(srs => {
        setSearchResults(srs);
      });
  }
  const selectedWords = usePagesStore();
  const onDelete = React.useCallback((index: PageProperties) => {
    const { path } = primarySidebar;
    if (path === null) {
      return;
    }
    const workbench = workbenches.find(w => w.path === path);
    if (workbench === undefined) {
      throw new Error('workbench is null');
    }
    api.deletePage(path, index);
    pageDispatch({ type: 'REMOVE_PAGE', payload: index });
  }, []);
  const workbench = workbenches.find(w => w.path === primarySidebar.path);
  if (workbench === undefined) {
    return <></>;
  }
  const { display, path } = primarySidebar;
  if (display === null) {
    return <></>;
  }
  if (path === null) {
    return <></>;
  }
  const { editable, indexes } = workbench;

  return (
    <VList>
      {editable && (
        <div key="request-new-page" className={theme['Index.li']}>
          <button
            className={theme['Index.button']}
            onClick={async () => {
              const newPage = await api.requestPage(path);
              // onSelectedWordFetch(newPage.index);
            }}
            type="button">
            <AddIcon fontSize="small" />
            ページを作成する
          </button>
        </div>
      )}
      {(indexes ?? []).map(index => (
        <div key={index.id} className={theme['Index.li']}>
          <button
            aria-label={index.title}
            className={theme['Index.button']}
            onClick={() => {
              if (
                (selectedWords ?? []).every(
                  m =>
                    m.pageProperties.id !== index.id ||
                    m.pageProperties.path !== path,
                )
              ) {
                onSelectedWordFetch(index);
              }
            }}
            type="button">
            <div>
              <div>{index.title}</div>
              <div>{index.preview}</div>
            </div>
          </button>
          {editable && (
            <button
              type="button"
              aria-label="削除"
              className="flex"
              onClick={() => {
                onDelete(index);
                onIndexesUpdate();
              }}>
              <DeleteIcon />
            </button>
          )}
        </div>
      ))}
    </VList>
  );
}

function SearchResults(): JSX.Element {
  const primarySidebar = usePrimarySidebarStore();
  const workbenches = useWorkbenchStore();
  const workbenchDispatch = useWorkbenchDispatch();
  const theme = useThemeStore();
  const pageDispatch = usePagesDispatch();
  const workbench = workbenches.find(w => w.path === primarySidebar.path);
  if (
    !primarySidebar.display ||
    primarySidebar.path === null ||
    workbench === undefined
  ) {
    return <></>;
  }
  const { editable, indexes, searchResults } = workbench;
  function onSelectedWordFetch(searchResult: SearchResult) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const pageProperties = indexes.find(i => i.id === searchResult.id)!;
    api.readPage(pageProperties).then(result => {
      pageDispatch({
        type: 'ADD_PAGE',
        payload: { ...result, pageProperties },
      });
    });
  }
  const onDelete = React.useCallback((searchResult: SearchResult) => {
    const { path } = primarySidebar;
    if (path === null) {
      return;
    }
    api.deletePage(
      path,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      workbench.indexes.find(i => i.id === searchResult.id)!,
    );
    workbenchDispatch({
      type: 'UPDATE_SEARCH_RESULTS',
      payload: {
        path: workbench.path,
        searchResults: workbench.searchResults.filter(
          sr => sr.id === searchResult.id,
        ),
      },
    });
  }, []);

  return (
    <VList>
      {editable && (
        <div key="request-new-page" className={theme['Index.li']}>
          <button
            className={theme['Index.button']}
            onClick={async () => {
              // const newPage = await api.requestPage(path);
              // onSelectedWordFetch(newPage.index);
            }}
            type="button">
            <AddIcon fontSize="small" />
            ページを作成する
          </button>
        </div>
      )}
      {(searchResults ?? []).map(searchResult => {
        const index = workbench.indexes.find(i => i.id === searchResult.id);
        if (index === undefined) {
          return <></>;
        }
        return (
          <div key={searchResult.id} className={theme['Index.li']}>
            <button
              aria-label={searchResult.id}
              className={theme['Index.button']}
              onClick={() => {
                if (
                  (searchResults ?? []).every(sr => sr.id !== searchResult.id)
                ) {
                  onSelectedWordFetch(searchResult);
                }
              }}
              type="button">
              <div>
                <div>{index.title}</div>
                <div>{searchResult.matches}</div>
              </div>
            </button>
            {editable && (
              <button
                type="button"
                aria-label="削除"
                className="flex"
                onClick={() => {
                  onDelete(searchResult);
                }}>
                <DeleteIcon />
              </button>
            )}
          </div>
        );
      })}
    </VList>
  );
}

export default function PrimarySidebar(): JSX.Element {
  const primarySidebar = usePrimarySidebarStore();
  const workbenches = useWorkbenchStore();
  const workbenchDispatch = useWorkbenchDispatch();
  const workbench = workbenches.find(w => w.path === primarySidebar.path);
  if (
    !primarySidebar.display ||
    primarySidebar.path === null ||
    workbench === undefined
  ) {
    return <></>;
  }
  const { path } = workbench;
  function onSelectedPageFormatIndexUpdate(selectedPageFormatIndex: number) {
    workbenchDispatch({
      type: 'UPDATE_SELECTED_PAGE_FORMAT_INDEX',
      payload: { path, selectedPageFormatIndex },
    });
  }
  function onSelectedSearchScopeIndexUpdate(selectedSearchScopeIndex: number) {
    workbenchDispatch({
      type: 'UPDATE_SELECTED_SEARCH_SCOPE_INDEX',
      payload: { path, selectedSearchScopeIndex },
    });
  }
  function onSelectedSearchCriterionIndexUpdate(
    selectedSearchCriterionIndex: number,
  ) {
    workbenchDispatch({
      type: 'UPDATE_SELECTED_SEARCH_CRITERION_INDEX',
      payload: { path, selectedSearchCriterionIndex },
    });
  }
  function onSearchWordUpdate(newSearchWord: string) {
    workbenchDispatch({
      type: 'UPDATE_SEARCH_WORD',
      payload: { path, searchWord: newSearchWord },
    });
  }

  const { searchWord, pageFormats, searchScopes, searchCriteria } = workbench;

  return (
    <div className="flex flex-col h-full">
      <input
        className="bg-transparent m-0.5 w-full"
        value={searchWord}
        onChange={event => onSearchWordUpdate(event.target.value)}
        id="standard-basic"
      />
      <div className="text-xs">種類</div>
      <select
        onChange={event => {
          onSelectedPageFormatIndexUpdate(parseInt(event.target.value, 10));
        }}>
        {pageFormats.map((pageFormat, index) => (
          <option key={pageFormat} value={index}>
            {pageFormat}
          </option>
        ))}
      </select>
      <div className="text-xs">検索範囲</div>
      <select
        onChange={event => {
          onSelectedSearchScopeIndexUpdate(parseInt(event.target.value, 10));
        }}>
        {searchScopes.map((criterion, index) => (
          <option key={criterion.id} value={index}>
            {criterion.name}
          </option>
        ))}
      </select>
      <div className="text-xs">検索方式</div>
      <select
        onChange={event => {
          onSelectedSearchCriterionIndexUpdate(
            parseInt(event.target.value, 10),
          );
        }}>
        {searchCriteria.map((criterion, index) => (
          <option key={criterion.id} value={index}>
            {criterion.name}
          </option>
        ))}
      </select>
      <div className="grow overflow-auto">
        <Indexes />
      </div>
    </div>
  );
}
