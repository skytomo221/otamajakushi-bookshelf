import flatten from 'flat';
import React from 'react';
import { useSelector } from 'react-redux';

import { LayoutComponent, LayoutCard } from '../../../common/LayoutCard';
import { WordCard } from '../../../common/WordCard';
import { SummaryWord } from '../../SummaryWord';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';

interface Props {
  baseReference: string;
  className?: string;
  content: LayoutComponent;
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: WordCard;
}

export default function ArrayElement({
  baseReference,
  className,
  content,
  editable,
  summary,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  // eslint-disable-next-line @typescript-eslint/ban-types
  const keys = Object.keys(flatten(word) as object);
  const length = new Set(
    keys
      .map(k => k.match(`^${baseReference}.\\d+`))
      .filter((k): k is NonNullable<typeof k> => k != null)
      .map(k => k[0]),
  ).size;
  return (
    <>
      {[...Array(length).keys()].map(i => (
        <Recursion
          key={i}
          baseReference={`${baseReference}.${i}`}
          contents={[content]}
          editable={editable}
          summary={summary}
          layout={layout}
          word={word}
        />
      ))}
    </>
  );
}
ArrayElement.defaultProps = {
  className: '',
};
