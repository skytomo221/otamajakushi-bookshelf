import { Layout, LayoutComponent } from 'otamashelf/LayoutCard';
import { BookTemplatePage, Page, PageTemplatePage } from 'otamashelf/Page';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { NormalPageReference } from 'otamashelf/PageReference';
import React from 'react';

import { Mediator, NormalMediator } from '../../Mediator';
import { usePagesDispatch } from '../../contexts/pagesContext';
import { useThemeStore } from '../../contexts/themeContext';
import '../../renderer';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';

import { Json } from 'otamashelf/Json';


const { api } = window;

interface Props {
  baseReference: string;
  className?: string;
  contents: LayoutComponent[];
  onClick: {
    id: string;
    script: Json;
  };
  edit: () => void;
  editable: boolean;
  pageIndex: Mediator['index'];
  layout: Layout;
  word: Page;
}

export default function ModifyPageButton({
  baseReference,
  className,
  contents,
  onClick: onClickButton,
  edit,
  editable,
  pageIndex,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const dispatch = usePagesDispatch();
  const onClick = React.useCallback(
    (
      s: Mediator,
      c: {
        id: string;
        script: Json;
      },
    ) => {
      if (s.index.type === 'normal') {
        api
          .modifyNormalPage(s.index, c.id, c.script)
          .then(({ page: newPage, layout: newLayout }) => dispatch({ type: 'UPDATE_PAGE', payload: { index: pageIndex, page: newPage, layout: newLayout } as NormalMediator }));
      }
      else if (s.index.type === 'book-template') {
        api
          .modifyBookTemplatePage(s.index, s.page as BookTemplatePage, c.script)
          .then(({ page: newPage, layout: newLayout }) => dispatch({ type: 'UPDATE_PAGE', payload: { index: pageIndex, page: newPage, layout: newLayout } as Mediator }));
      }
      else if (s.index.type === 'page-template') {
        api
          .modifyPageTemplatePage(s.index, s.page as PageTemplatePage, c.id, c.script)
          .then(({ page: newPage, layout: newLayout }) => dispatch({ type: 'UPDATE_PAGE', payload: { index: pageIndex, page: newPage, layout: newLayout } as Mediator }));
      }
    },
    [],
  );
  return editable ? (
    <button
      aria-label="Save"
      className={styleJoin(theme.button, className)}
      onClick={() => {
        onClick({ index: pageIndex, layout, page: word } as Mediator, onClickButton);
      }}
      type="submit">
      <Recursion
        baseReference={baseReference}
        contents={contents}
        edit={edit}
        editable={editable}
        pageIndex={pageIndex}
        layout={layout}
        word={word}
      />
    </button>
  ) : (
    <></>
  );
}
ModifyPageButton.defaultProps = {
  className: '',
};
