import { PageCard, LayoutCard, LayoutComponent } from 'otamashelf';
import React from 'react';
import { Draggable as RawDraggable } from 'react-beautiful-dnd';

import { SummaryWord } from '../../SummaryWord';
import { useThemeStore } from '../../contexts/themeContext';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';

interface Props {
  draggableId: string;
  index: number;
  baseReference: string;
  className?: string;
  contents: LayoutComponent[];
  edit: () => void;
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}

export default function Draggable({
  draggableId,
  index,
  baseReference,
  contents,
  edit,
  editable,
  summary,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <RawDraggable draggableId={draggableId} index={index}>
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
            edit={edit}
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
