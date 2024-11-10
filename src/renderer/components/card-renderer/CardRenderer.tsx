import React from 'react';

import { Mediator, isBookTemplateMediator, isNormalMediator, isPageTemplateMediator } from '../../Mediator';
import { useWorkbenchStore } from '../../contexts/workbenchContext';

import DragDropRenderer from './DragDropRenderer';
import Recursion from './Recursion';

export default function CardRenderer(mediator: Mediator): JSX.Element {
  const state = useWorkbenchStore();
  const { index, page, layout } = mediator;
  const editable =
    isNormalMediator(mediator) && (state?.find(workbench => workbench.path === mediator.index.bookPath)
      ?.editable ?? false) || isBookTemplateMediator(mediator) || isPageTemplateMediator(mediator);
  return (
    <DragDropRenderer
      mediator={mediator}
    >
      <Recursion
        baseReference=""
        layout={layout}
        pageIndex={index}
        word={page}
        contents={[layout]}
        edit={() => {
          // do nothing.
        }}
        editable={editable}
      />
    </DragDropRenderer>
  );
}
