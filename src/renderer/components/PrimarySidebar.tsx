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
  const [words, setWords] = useState<SummaryWord[]>();
  const [templates, setTemplates] = useState<TemplateProperties[]>();
  useEffect(() => {
    const process = async () => {
      setWords(await api.readIndexes(book.path));
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
      {(words ?? [])
        .filter(word => {
          switch (mode) {
            case 'startsWith':
              return word.form.startsWith(search);
            case 'endsWith':
              return word.form.endsWith(search);
            case 'matches':
              return word.form.includes(search);
            case 'regex':
              return word.form.match(search);
            default:
              return true;
          }
        })
        .sort((a, b) => {
          const af = a.form.toUpperCase();
          const bf = b.form.toUpperCase();
          if (af < bf) {
            return -1;
          }
          if (af > bf) {
            return 1;
          }
          return 0;
        })
        .map(word => (
          <li key={word.id} className={theme.style['Index.li']}>
            <button
              className={theme.style['Index.button']}
              onClick={() => {
                if (
                  (selectedWords ?? []).every(
                    mediator =>
                      mediator.summary.id !== word.id ||
                      mediator.summary.bookPath !== book.path,
                  )
                ) {
                  onSelectedWordFetch(word);
                }
              }}
              type="button">
              {word.form}
            </button>
            {editable && (
              <button
                type="button"
                className="flex"
                onClick={() => {
                  onDelete(word);
                  setWords(words?.filter(w => w.id !== word.id));
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
