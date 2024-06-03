import React from 'react';

import { Mediator } from '../../Mediator';
import { useWorkbenchStore } from '../../contexts/workbenchContext';

import DragDropRenderer from './DragDropRenderer';
import Recursion from './Recursion';

export default function CardRenderer({
  pageProperties,
  page: word,
  layout,
}: Mediator): JSX.Element {
  const state = useWorkbenchStore();
  const editable =
    state?.find(workbench => workbench.path === pageProperties.path)
      ?.editable ?? false;
  return (
    <DragDropRenderer
      pageProperties={pageProperties}
      word={word}
      layout={layout}>
      <Recursion
        baseReference=""
        layout={layout}
        pageProperties={pageProperties}
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
