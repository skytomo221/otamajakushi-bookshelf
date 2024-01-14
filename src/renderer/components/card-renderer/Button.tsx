import { PageCard, LayoutCard, LayoutComponent } from 'otamashelf';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SummaryWord } from '../../SummaryWord';
import { onClickAction } from '../../actions/SelectedWordsActions';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';

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
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  const dispatch = useDispatch();
  const onClick = React.useCallback((s: SummaryWord, c: {
    type: string;
    id: string;
    script: string;
  }) => {
    dispatch(onClickAction({ summary: s, onClick: c }));
  }, []);
  return editable ? (
    <button
      aria-label="Save"
      className={styleJoin(theme.style.button, className)}
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
