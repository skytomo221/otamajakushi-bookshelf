import { PageCard, LayoutCard, LayoutComponent } from 'otamashelf';
import React from 'react';
import { Draggable as RawDraggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import { SummaryWord } from '../../SummaryWord';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';

interface Props {
  reference: string;
  index: number;
  baseReference: string;
  className?: string;
  contents: LayoutComponent[];
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}

export default function Draggable({
  reference,
  index,
  baseReference,
  contents,
  editable,
  summary,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <RawDraggable draggableId={reference} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          ref={draggableProvided.innerRef}
          className={
            draggableSnapshot.isDragging
              ? theme.style['DraggableArray.Draggable.Dragging']
              : theme.style['DraggableArray.Draggable']
          }
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...draggableProvided.draggableProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...draggableProvided.dragHandleProps}>
          <Recursion
            baseReference={baseReference}
            contents={contents}
            editable={editable}
            summary={summary}
            layout={layout}
            word={word}
          />
        </div>
      )}
    </RawDraggable>
  );
}
Draggable.defaultProps = {
  className: '',
};
