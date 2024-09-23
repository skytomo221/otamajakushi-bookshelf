import React from 'react';

import { Mediator } from '../../Mediator';
import { useWorkbenchStore } from '../../contexts/workbenchContext';

import DragDropRenderer from './DragDropRenderer';
import Recursion from './Recursion';

export default function CardRenderer({
  index,
  page: word,
  layout,
}: Mediator): JSX.Element {
  const state = useWorkbenchStore();
  const editable =
    state?.find(workbench => workbench.path === index.bookPath)
      ?.editable ?? false;
  return (
    <DragDropRenderer
      pageIndex={index}
      word={word}
      layout={layout}>
      <Recursion
        baseReference=""
        layout={layout}
        pageIndex={index}
        word={word}
        contents={[layout]}
        edit={() => {
          // do nothing.
        }}
        editable={editable}
      />
    </DragDropRenderer>
  );
}
