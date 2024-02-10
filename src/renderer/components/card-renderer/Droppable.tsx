import { PageCard, LayoutCard, LayoutComponent } from 'otamashelf';
import React from 'react';
import { Droppable as RawDroppable } from 'react-beautiful-dnd';

import { SummaryWord } from '../../SummaryWord';
import { useThemeStore } from '../../contexts/themeContext';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';

interface Props {
  baseReference: string;
  className?: string;
  droppableId: string;
  type: string;
  contents: LayoutComponent[];
  edit: () => void;
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}

export default function Droppable({
  baseReference,
  contents,
  droppableId,
  type,
  edit,
  editable,
  summary,
  layout,
  word,
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
          <Recursion
            baseReference={baseReference}
            contents={contents}
            edit={edit}
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
