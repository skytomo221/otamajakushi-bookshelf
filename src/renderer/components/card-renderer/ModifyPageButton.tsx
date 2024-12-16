import { BookTemplatePage, PageTemplatePage } from 'otamashelf/Page';
import React, { useContext } from 'react';

import { Mediator, NormalMediator } from '../../Mediator';
import { usePagesDispatch } from '../../contexts/pagesContext';
import { useThemeStore } from '../../contexts/themeContext';
import '../../renderer';

import { WordTabIndexContext } from '../../contexts/wordTabIndexContext';

import { PageRendererContext } from './PageRendererContext';
// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';

import { Json } from 'otamashelf/Json';


const { api } = window;

interface Props {
  onClick: {
    id: string;
    script: Json;
  };
}

export default function ModifyPageButton({
  onClick: onClickButton,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const { className, editable, pageIndex, layout, word } = useContext(PageRendererContext);
  const dispatch = usePagesDispatch();
  const wordTabsIndex = useContext(WordTabIndexContext);
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
          .then(({ page: newPage, layout: newLayout }) => dispatch({ type: 'UPDATE_PAGE_WITH_INDEX', index: wordTabsIndex, payload: { index: pageIndex, page: newPage, layout: newLayout } as Mediator }));
      }
      else if (s.index.type === 'page-template') {
        api
          .modifyPageTemplatePage(s.index, s.page as PageTemplatePage, c.id, c.script)
          .then(({ page: newPage, layout: newLayout }) => dispatch({ type: 'UPDATE_PAGE_WITH_INDEX', index: wordTabsIndex, payload: { index: pageIndex, page: newPage, layout: newLayout } as Mediator }));
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
      <Recursion />
    </button>
  ) : (
    <></>
  );
}
