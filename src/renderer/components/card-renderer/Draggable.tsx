import React from 'react';
import { Draggable as RawDraggable } from 'react-beautiful-dnd';

import { useThemeStore } from '../../contexts/themeContext';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';

interface Props {
  draggableId: string;
  index: number;
}

export default function Draggable({
  draggableId,
  index,
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
              ? theme['DraggableArray.Draggable.Dragging']
              : theme['DraggableArray.Draggable']
          }
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...draggableProvided.draggableProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...draggableProvided.dragHandleProps}>
          <Recursion />
        </div>
      )}
    </RawDraggable>
  );
}
