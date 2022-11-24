import flatten from 'flat';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

export default function DraggableArray({
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="droppable" isDropDisabled={!editable}>
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
            {[...Array(length).keys()].map(i => (
              <Draggable
                key={i}
                draggableId={`draggable-${i}`}
                index={i}
                isDragDisabled={!editable}>
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
                      baseReference={`${baseReference}.${i}`}
                      contents={[content]}
                      editable={editable}
                      summary={summary}
                      layout={layout}
                      word={word}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
DraggableArray.defaultProps = {
  className: '',
};
