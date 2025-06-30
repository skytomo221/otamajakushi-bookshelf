import { PageReference } from 'otamashelf/PageReference';
import React, { useContext } from 'react';

import { usePagesDispatch } from '../../contexts/pagesContext';
import { usePrimarySidebarStore } from '../../contexts/primarySidebarContext';
import { useThemeStore } from '../../contexts/themeContext';
import { useWorkbenchStore } from '../../contexts/workbenchContext';

import { PageRendererContext } from './PageRendererContext';
import styleJoin from './styleJoin';

const { api } = window;

interface Props {
  pageReference: PageReference;
}

export default function PageLink({
  pageReference,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const pagesDispatch = usePagesDispatch();
  const { className } = useContext(PageRendererContext);
  const primarySidebar = usePrimarySidebarStore();
  const workbenches = useWorkbenchStore();
  const workbench = workbenches.find(w => w.path === primarySidebar.path);
  if (
    !primarySidebar.display ||
    primarySidebar.path === null ||
    workbench === undefined
  ) {
    return <></>;
  }
  const { indexes } = workbench;
  function onClick() {
    if (pageReference.type === 'normal') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const index = indexes.find(i => i.pageId === pageReference.pageId)!;
      api.readPage(pageReference).then((result) => {
        pagesDispatch({ type: 'ADD_PAGE', payload: { ...result, index } });
      });
    }
  }
  function pageReferenceToString(): string {
    if (pageReference.type === 'normal') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const index = indexes.find(i => i.pageId === pageReference.pageId)!;
      return index.title;
    }
    return `Unsupported page type: ${pageReference.type}`; // Fallback for other types
  }
  return (
    <button
      className={styleJoin(theme.button, className)}
      type="button"
      onClick={onClick}
    >
      {pageReferenceToString()}
    </button>
  );
}
