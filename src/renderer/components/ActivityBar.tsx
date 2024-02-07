import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import * as React from 'react';

import { useWorkbenchStore } from '../contexts/workbenchContext';

import BookViewContainer from './BookViewContainer';

export const activityBarWidth = 240;

export default function ActivityBar(): JSX.Element {
  const books = useWorkbenchStore().map(w => w.book);

  return (
    <div className="flex flex-col w-16">
      <List>
        {books
          .filter(book => book.editable)
          .map(book => (
            <BookViewContainer key={book.path} book={book} />
          ))}
      </List>
      {books.filter(book => book.editable).length > 0 ? <Divider /> : <></>}
      <List>
        {books
          .filter(book => !book.editable)
          .map(book => (
            <BookViewContainer key={book.path} book={book} />
          ))}
      </List>
    </div>
  );
}
