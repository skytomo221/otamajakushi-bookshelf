import React from 'react';
import { useSelector } from 'react-redux';

import { LayoutComponent, LayoutCard } from '../../../common/LayoutCard';
import { WordCard } from '../../../common/WordCard';
import { SummaryWord } from '../../SummaryWord';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';

interface Props {
  className?: string;
  contents: LayoutComponent[];
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: WordCard;
}

export default function H6({
  className,
  contents,
  editable,
  summary,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return (
    <h6 className={styleJoin(theme.style.h6, className)}>
      <Recursion
        contents={contents}
        editable={editable}
        summary={summary}
        layout={layout}
        word={word}
      />
    </h6>
  );
}
H6.defaultProps = {
  className: '',
};
