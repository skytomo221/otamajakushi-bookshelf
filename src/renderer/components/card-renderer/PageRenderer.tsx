import React from 'react';

import { Mediator, isBookTemplateMediator, isNormalMediator, isPageTemplateMediator } from '../../Mediator';
import { useWorkbenchStore } from '../../contexts/workbenchContext';

import DragDropRenderer from './DragDropRenderer';
import { PageRendererContext } from './PageRendererContext';
import Recursion from './Recursion';

export default function PageRenderer(mediator: Mediator): JSX.Element {
  const state = useWorkbenchStore();
  const { index, page, layout } = mediator;
  const editable =
    isNormalMediator(mediator) && (state?.find(workbench => workbench.path === mediator.index.bookPath)
      ?.editable ?? false) || isBookTemplateMediator(mediator) || isPageTemplateMediator(mediator);
  return (
    <DragDropRenderer
      mediator={mediator}
    >
      <PageRendererContext.Provider value={{
        baseReference: '',
        className: '',
        contents: [layout],
        edit: () => {
          // do nothing.
        },
        editable,
        pageIndex: index,
        layout,
        word: page,
      }}>
        <Recursion />
      </PageRendererContext.Provider>
    </DragDropRenderer>
  );
}
