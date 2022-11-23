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
  baseReference: string;
  className?: string;
  contents: LayoutComponent[];
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: WordCard;
}

export default function Div({
  baseReference,
  className,
  contents,
  editable,
  summary,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return (
    <div className={styleJoin(theme.style.div, className)}>
      <Recursion
        baseReference={baseReference}
        contents={contents}
        editable={editable}
        summary={summary}
        layout={layout}
        word={word}
      />
    </div>
  );
}
Div.defaultProps = {
  className: '',
};
