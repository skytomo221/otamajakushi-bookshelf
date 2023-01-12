import React from 'react';
import { useSelector } from 'react-redux';

import { Mediator } from '../../Mediator';
import { State } from '../../states/State';

import Recursion from './Recursion';

export default function CardRenderer({
  summary,
  word,
  layout,
}: Mediator): JSX.Element {
  const editable = useSelector<State, boolean>(
    (state: State) =>
      state.workbenches.find(
        workbench => workbench.book.path === summary.bookPath,
      )?.book.editable ?? false,
  );
  return (
    <Recursion
      baseReference=""
      layout={layout}
      summary={summary}
      word={word}
      contents={
        layout.layout.component === 'recursion'
          ? layout.layout.contents
          : [layout.layout]
      }
      editable={editable}
    />
  );
}
