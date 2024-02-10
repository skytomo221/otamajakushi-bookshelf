import { PageCard, LayoutCard, LayoutComponent } from 'otamashelf';
import React from 'react';

import { SummaryWord } from '../../SummaryWord';
import { usePagesDispatch } from '../../contexts/pagesContext';
import { useThemeStore } from '../../contexts/themeContext';
import '../../renderer';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';

const { api } = window;

interface Props {
  baseReference: string;
  className?: string;
  contents: LayoutComponent[];
  onClick: {
    type: string;
    id: string;
    script: string;
  };
  edit: () => void;
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}

export default function Button({
  baseReference,
  className,
  contents,
  onClick: onClickButton,
  edit,
  editable,
  summary,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const dispatch = usePagesDispatch();
  const onClick = React.useCallback(
    (
      s: SummaryWord,
      c: {
        type: string;
        id: string;
        script: string;
      },
    ) => {
      api
        .onClick(s, c)
        .then(mediator => dispatch({ type: 'UPDATE_PAGE', payload: mediator }));
    },
    [],
  );
  return editable ? (
    <button
      aria-label="Save"
      className={styleJoin(theme.button, className)}
      onClick={() => {
        onClick(summary, onClickButton);
      }}
      type="submit">
      <Recursion
        baseReference={baseReference}
        contents={contents}
        edit={edit}
        editable={editable}
        summary={summary}
        layout={layout}
        word={word}
      />
    </button>
  ) : (
    <></>
  );
}
Button.defaultProps = {
  className: '',
};
