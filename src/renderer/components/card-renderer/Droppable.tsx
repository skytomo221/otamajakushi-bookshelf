import { PageCard, LayoutCard, LayoutComponent } from 'otamashelf';
import React from 'react';
import { Droppable as RawDroppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import { SummaryWord } from '../../SummaryWord';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';

interface Props {
  baseReference: string;
  className?: string;
  reference: string;
  type: string;
  contents: LayoutComponent[];
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}

export default function Droppable({
  baseReference,
  contents,
  reference,
  type,
  editable,
  summary,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <RawDroppable droppableId={reference} isDropDisabled={!editable} type={type}>
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          className={
            droppableSnapshot.isDraggingOver
              ? theme.style['DraggableArray.Droppable.DraggingOver']
              : theme.style['DraggableArray.Droppable']
          }
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...droppableProvided.droppableProps}>
          <Recursion
            baseReference={baseReference}
            contents={contents}
            editable={editable}
            summary={summary}
            layout={layout}
            word={word}
          />
          {droppableProvided.placeholder}
        </div>
      )}
    </RawDroppable>
  );
}
Droppable.defaultProps = {
  className: '',
};
