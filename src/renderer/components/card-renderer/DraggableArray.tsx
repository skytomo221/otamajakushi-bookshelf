import flatten, { unflatten } from 'flat';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';

import { LayoutComponent, LayoutCard } from '../../../common/LayoutCard';
import { WordCard } from '../../../common/WordCard';
import { Mediator } from '../../Mediator';
import { SummaryWord } from '../../SummaryWord';
import { pushSelectedWordAction } from '../../actions/SelectedWordsActions';
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

function swap<T>(items: T[], source: number, destination: number) {
  const newItems = [...items];
  const [removed] = newItems.splice(source, 1);
  newItems.splice(destination, 0, removed);
  return newItems;
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
  const dispatch = useDispatch();
  const onSelectedWordPush = React.useCallback((mediator: Mediator) => {
    dispatch(pushSelectedWordAction(mediator));
  }, []);
  const flat = flatten(word) as { [name: string]: unknown };
  // eslint-disable-next-line @typescript-eslint/ban-types
  const keys = Object.keys(flat);
  const length = new Set(
    keys
      .map(k => k.match(`^${baseReference}.\\d+`))
      .filter((k): k is NonNullable<typeof k> => k != null)
      .map(k => k[0]),
  ).size;

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <DragDropContext
      onDragEnd={result => {
        if (!result.destination) return;
        const { source, destination } = result;
        const newFlat: { [name: string]: unknown } = {};
        const newIndex = swap(
          [...Array(length).keys()],
          source.index,
          destination.index,
        );
        keys.forEach(k => {
          const match = k.match(`^${baseReference}\\.(\\d+)`);
          if (match) {
            const oldIndex = parseInt(match[1], 10);
            newFlat[
              k.replace(
                `${baseReference}.${oldIndex}`,
                `${baseReference}.${newIndex.findIndex(i => i === oldIndex)}`,
              )
            ] = flat[k];
          } else {
            newFlat[k] = flat[k];
          }
        });
        onSelectedWordPush({
          summary,
          layout,
          word: unflatten(newFlat),
        });
      }}>
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
                key={
                  JSON.stringify(
                    Object.entries(flat)
                      .filter(([k]) => k.match(`^${baseReference}\\.${i}`))
                      .reduce(
                        (l, [k, v]) =>
                          Object.assign(l, {
                            [k.replace(
                              new RegExp(`^${baseReference}\\.${i}`),
                              '',
                            )]: v,
                          }),
                        {},
                      ),
                  ) + i
                }
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
