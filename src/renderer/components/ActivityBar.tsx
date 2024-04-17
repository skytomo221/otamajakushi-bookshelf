import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import * as React from 'react';

import { useWorkbenchStore } from '../contexts/workbenchContext';

import BookViewContainer from './BookViewContainer';

export const activityBarWidth = 240;

export default function ActivityBar(): JSX.Element {
  const workbenches = useWorkbenchStore();

  return (
    <div className="flex flex-col w-16">
      <List>
        {workbenches
          .filter(workbench => workbench.editable)
          .map(workbench => (
            <BookViewContainer key={workbench.path} book={workbench} />
          ))}
      </List>
      {workbenches.filter(book => book.editable).length > 0 ? (
        <Divider />
      ) : (
        <></>
      )}
      <List>
        {workbenches
          .filter(workbench => !workbench.editable)
          .map(workbench => (
            <BookViewContainer key={workbench.path} book={workbench} />
          ))}
      </List>
    </div>
  );
}
