import React from 'react';
import { Droppable as RawDroppable } from 'react-beautiful-dnd';

import { useThemeStore } from '../../contexts/themeContext';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';

interface Props {
  droppableId: string;
  type: string;
  editable: boolean;
}

export default function Droppable({
  droppableId,
  type,
  editable,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <RawDroppable
      droppableId={droppableId}
      isDropDisabled={!editable}
      type={type}>
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          className={
            droppableSnapshot.isDraggingOver
              ? theme['DraggableArray.Droppable.DraggingOver']
              : theme['DraggableArray.Droppable']
          }
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...droppableProvided.droppableProps}>
          <Recursion />
          {droppableProvided.placeholder}
        </div>
      )}
    </RawDroppable>
  );
}
