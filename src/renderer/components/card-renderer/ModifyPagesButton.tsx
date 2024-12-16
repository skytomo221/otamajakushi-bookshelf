import React, { useContext } from 'react';

import { Mediator, NormalMediator } from '../../Mediator';
import { usePagesDispatch } from '../../contexts/pagesContext';
import { useThemeStore } from '../../contexts/themeContext';
import '../../renderer';

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

export default function ModifyPagesButton({
  onClick: onClickButton,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const { className, editable, pageIndex, layout, word } = useContext(PageRendererContext);
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
          .modifyPagesFromNormalPage(s.index, c.id, c.script)
          .then(({ page: newPage, layout: newLayout }) => dispatch({ type: 'UPDATE_PAGE', payload: { index: pageIndex, page: newPage, layout: newLayout } as NormalMediator }));
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
