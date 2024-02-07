import React from 'react';

import { Mediator } from '../../Mediator';
import { useWorkbenchStore } from '../../contexts/workbenchContext';

import DragDropRenderer from './DragDropRenderer';
import Recursion from './Recursion';

export default function CardRenderer({
  summary,
  word,
  layout,
}: Mediator): JSX.Element {
  const state = useWorkbenchStore();
  const editable =
    state?.find(workbench => workbench.book.path === summary.bookPath)?.book
      .editable ?? false;
  return (
    <DragDropRenderer summary={summary} word={word} layout={layout}>
      <Recursion
        baseReference=""
        layout={layout}
        summary={summary}
        word={word}
        contents={
          typeof layout.layout !== 'string' &&
          layout.layout.component === 'recursion'
            ? layout.layout.contents
            : [layout.layout]
        }
        edit={() => {
          // do nothing.
        }}
        editable={editable}
      />
    </DragDropRenderer>
  );
}
