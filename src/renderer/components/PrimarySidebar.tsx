import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { SearchResult } from 'otamashelf/PageExplorer';
import { NormalPageReference } from 'otamashelf/PageReference';
import { SearchCard } from 'otamashelf/SearchCard';
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
  function onSelectedWordFetch(index: NormalPageReference & PageDisplayInformation) {
    api.readPage(index).then(result => {
      pageDispatch({
        type: 'ADD_PAGE',
        payload: { ...result, index },
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
  const onDelete = React.useCallback((index: NormalPageReference) => {
    const { path } = primarySidebar;
    if (path === null) {
      return;
    }
    const workbench = workbenches.find(w => w.path === path);
    if (workbench === undefined) {
      throw new Error('workbench is null');
    }
    api.deletePage(index);
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
        <div key={index.pageId} className={theme['Index.li']}>
          <button
            aria-label={index.title}
            className={theme['Index.button']}
            onClick={() => {
              if (
                (selectedWords ?? []).every(
                  m =>
                    m.index.pageId !== index.pageId ||
                    m.index.bookPath !== path,
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

function HighlightMatches(searchResult: (SearchCard & SearchResult)): JSX.Element {
  console.log(searchResult);
  return <div>
    {searchResult.matches.map((match, index) => <div key={index}>
        {searchResult.targets[match.targetIndex].slice(0, match.begin)}
        <span className="bg-yellow-300">{searchResult.targets[match.targetIndex].slice(match.begin, match.end)}</span>
        {searchResult.targets[match.targetIndex].slice(match.end)}
      </div>)}
  </div>;
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
    const index = indexes.find(i => i.pageId === searchResult.id)!;
    api.readPage(index).then(result => {
      pageDispatch({
        type: 'ADD_PAGE',
        payload: { ...result, index },
      });
    });
  }
  const onDelete = React.useCallback((searchResult: SearchResult) => {
    const { path } = primarySidebar;
    if (path === null) {
      return;
    }
    api.deletePage(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      workbench.indexes.find(i => i.pageId === searchResult.id)!,
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
        const index = workbench.indexes.find(i => i.pageId === searchResult.id);
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
                <div>{HighlightMatches(searchResult)}</div>
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
  function onSearchResultsUpdate(selectedPageFormatIndex: number, selectedSearchScopeIndex: number, selectedSearchCriterionIndex: number, searchWord: string) {
    if (workbench === undefined) {
      return;
    }
    const {
      path,
      searchCriteria,
      searchScopes,
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
      ).then(searchResults => {
        workbenchDispatch({
          type: 'UPDATE_SEARCH_RESULTS',
          payload: { path, searchResults },
        });
      });
  }
  const { searchWord, pageFormats, searchScopes, searchCriteria, selectedPageFormatIndex, selectedSearchScopeIndex, selectedSearchCriterionIndex } = workbench;
  function onSelectedPageFormatIndexUpdate(newSelectedPageFormatIndex: number) {
    onSearchResultsUpdate(newSelectedPageFormatIndex, selectedSearchScopeIndex, selectedSearchCriterionIndex, searchWord);
    workbenchDispatch({
      type: 'UPDATE_SELECTED_PAGE_FORMAT_INDEX',
      payload: { path, selectedPageFormatIndex: newSelectedPageFormatIndex },
    });
  }
  function onSelectedSearchScopeIndexUpdate(newSelectedSearchScopeIndex: number) {
    onSearchResultsUpdate(selectedPageFormatIndex, newSelectedSearchScopeIndex, selectedSearchCriterionIndex, searchWord);
    workbenchDispatch({
      type: 'UPDATE_SELECTED_SEARCH_SCOPE_INDEX',
      payload: { path, selectedSearchScopeIndex: newSelectedSearchScopeIndex },
    });
  }
  function onSelectedSearchCriterionIndexUpdate(
    newSelectedSearchCriterionIndex: number,
  ) {
    onSearchResultsUpdate(selectedPageFormatIndex, selectedSearchScopeIndex, newSelectedSearchCriterionIndex, searchWord);
    workbenchDispatch({
      type: 'UPDATE_SELECTED_SEARCH_CRITERION_INDEX',
      payload: { path, selectedSearchCriterionIndex: newSelectedSearchCriterionIndex },
    });
  }
  async function onSearchWordUpdate(newSearchWord: string) {
    onSearchResultsUpdate(selectedPageFormatIndex, selectedSearchScopeIndex, selectedSearchCriterionIndex, newSearchWord);
    workbenchDispatch({
      type: 'UPDATE_SEARCH_WORD',
      payload: { path, searchWord: newSearchWord },
    });
  }

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
        {searchWord === '' ? <Indexes /> : <SearchResults />}
      </div>
    </div>
  );
}
