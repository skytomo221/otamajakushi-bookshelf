import {
  mdiRegex,
  mdiBookSearch,
  mdiFormatLetterStartsWith,
  mdiFormatLetterEndsWith,
  mdiFormatLetterMatches,
} from '@mdi/js';
import Icon from '@mdi/react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TemplateProperties from '../../common/TemplateProperties';
import { Mediator } from '../Mediator';
import { SummaryWord } from '../SummaryWord';
import {
  deleteSelectedWordAction,
  fetchSelectedWordAction,
} from '../actions/SelectedWordsActions';
import Book from '../states/Book';
import { State } from '../states/State';
import '../renderer';
import ThemeParameter from '../states/ThemeParameter';
import CardRenderer from './card-renderer/CardRenderer';

const { api } = window;

export const primarySidebarWidth = 240;

interface IndexProps {
  book: Book;
  search: string;
  mode: string;
}

function Index({ book, search, mode }: IndexProps): JSX.Element {
  const dispatch = useDispatch();
  const editable = useSelector<State, boolean>(
    (state: State) =>
      state.bookshelf.books.find(b => b.path === book.path)?.editable ?? false,
  );
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  const onSelectedWordFetch = React.useCallback((selectedWord: SummaryWord) => {
    dispatch(fetchSelectedWordAction(selectedWord));
  }, []);
  const selectedWords = useSelector<State, null | Mediator[]>(
    (state: State) => state.selectedWords,
  );
  const [mediators, setMediators] = useState<Mediator[]>();
  const [templates, setTemplates] = useState<TemplateProperties[]>();
  useEffect(() => {
    const process = async () => {
      setMediators(await api.selectPage(book.path, 'all', ''));
      setTemplates(await api.readTemplates(book.path));
    };
    process();
  }, []);
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
      {(mediators ?? [])
        .filter(mediator => {
          switch (mode) {
            case 'startsWith':
              return mediator.word.title.startsWith(search);
            case 'endsWith':
              return mediator.word.title.endsWith(search);
            case 'matches':
              return mediator.word.title.includes(search);
            case 'regex':
              return mediator.word.title.match(search);
            default:
              return true;
          }
        })
        .map(mediator => (
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
                  setMediators(
                    mediators?.filter(
                      m => m.summary.id !== mediator.summary.id,
                    ),
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
  const books = useSelector<State, Book[]>(
    (state: State) => state.bookshelf.books,
  );
  const primarySidebar = useSelector<State, null | string>(
    (state: State) => state.primarySidebar,
  );
  const open = primarySidebar !== null;
  const [search, setSearch] = useState<string>('');
  const [searchMode, setSearchMode] = useState<number>(0);
  const icons = [
    <Icon
      key={0}
      path={mdiFormatLetterStartsWith}
      title="Start with"
      size={1}
    />,
    <Icon key={1} path={mdiFormatLetterEndsWith} title="Ends with" size={1} />,
    <Icon key={2} path={mdiFormatLetterMatches} title="Matches" size={1} />,
    <Icon key={3} path={mdiRegex} title="Regex" size={1} />,
    <Icon key={4} path={mdiBookSearch} title="Full text search" size={1} />,
  ];
  const modes = ['startsWith', 'endsWith', 'matches', 'regex', 'fullText'];

  if (open) {
    return books.some(book => book.path === primarySidebar) ? (
      <div className="flex flex-col h-full">
        <div className="flex">
          <button
            aria-label="delete"
            onClick={() => setSearchMode((searchMode + 1) % icons.length)}
            type="button">
            {icons[searchMode]}
          </button>
          <input
            className="bg-transparent m-0.5 w-full"
            value={search}
            onChange={event => setSearch(event.target.value)}
            id="standard-basic"
          />
        </div>
        <div className="grow overflow-auto">
          <ul>
            <Index
              book={books.find(book => book.path === primarySidebar) as Book}
              search={search}
              mode={modes[searchMode]}
            />
          </ul>
        </div>
      </div>
    ) : (
      <></>
    );
  }
  return <></>;
}
