import flatten from 'flat';
import { PageCard, LayoutCard, LayoutComponent } from 'otamashelf';
import React from 'react';

import { SummaryWord } from '../../SummaryWord';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';

interface Props {
  baseReference: string;
  content: LayoutComponent;
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}

export default function ArrayElement({
  baseReference,
  content,
  editable,
  summary,
  layout,
  word,
}: Props): JSX.Element {
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
