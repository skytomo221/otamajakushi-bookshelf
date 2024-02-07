import flatten, { unflatten } from 'flat';
import { PageCard, LayoutCard } from 'otamashelf';
import React, { ReactNode } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { Mediator } from '../../Mediator';
import { SummaryWord } from '../../SummaryWord';
import { usePagesDispatch } from '../../contexts/pagesContext';

const { api } = window;

type Props = {
  summary: SummaryWord;
  word: PageCard;
  layout: LayoutCard;
  children: ReactNode;
};
export default function DragDropRenderer({
  summary,
  word,
  layout,
  children,
}: Props): JSX.Element {
  const dispatch = usePagesDispatch();
  function onSelectedWordPush(mediator: Mediator) {
    api
      .updatePage(mediator.summary, mediator.word)
      .then(m => dispatch({ type: 'UPDATE_PAGE', payload: m }));
  }
  const flat = flatten(word) as { [name: string]: unknown };
  // eslint-disable-next-line @typescript-eslint/ban-types
  const keys = Object.keys(flat);
  return (
    <DragDropContext
      onDragEnd={result => {
        if (!result.destination) return;
        const { source, destination } = result;
        const newFlat: { [name: string]: unknown } = {};
        const sourcePattern = `^${source.droppableId}\\.(\\d+)`;
        const destinationPattern = `^${destination.droppableId}\\.(\\d+)`;
        keys.forEach(k => {
          const sourceMatch = k.match(sourcePattern);
          const destinationMatch = k.match(destinationPattern);
          if (sourceMatch && destinationMatch) {
            const oldIndex = parseInt(sourceMatch[1], 10);
            if (oldIndex === source.index) {
              newFlat[
                k.replace(
                  `${source.droppableId}.${source.index}`,
                  `${destination.droppableId}.${destination.index}`,
                )
              ] = flat[k];
            } else if (
              source.index < destination.index &&
              source.index < oldIndex &&
              oldIndex <= destination.index
            ) {
              newFlat[
                k.replace(
                  `${source.droppableId}.${oldIndex}`,
                  `${destination.droppableId}.${oldIndex - 1}`,
                )
              ] = flat[k];
            } else if (
              source.index > destination.index &&
              source.index > oldIndex &&
              oldIndex >= destination.index
            ) {
              newFlat[
                k.replace(
                  `${source.droppableId}.${oldIndex}`,
                  `${destination.droppableId}.${oldIndex + 1}`,
                )
              ] = flat[k];
            } else {
              newFlat[k] = flat[k];
            }
          } else if (sourceMatch) {
            const oldIndex = parseInt(sourceMatch[1], 10);
            if (oldIndex < source.index) {
              newFlat[k] = flat[k];
            } else if (oldIndex > source.index) {
              newFlat[
                k.replace(
                  `${source.droppableId}.${oldIndex}`,
                  `${source.droppableId}.${oldIndex - 1}`,
                )
              ] = flat[k];
            } else {
              newFlat[
                k.replace(
                  `${source.droppableId}.${oldIndex}`,
                  `${destination.droppableId}.${destination.index}`,
                )
              ] = flat[k];
            }
          } else if (destinationMatch) {
            const oldIndex = parseInt(destinationMatch[1], 10);
            if (oldIndex < destination.index) {
              newFlat[k] = flat[k];
            } else {
              newFlat[
                k.replace(
                  `${destination.droppableId}.${oldIndex}`,
                  `${destination.droppableId}.${oldIndex + 1}`,
                )
              ] = flat[k];
            }
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
      {children}
    </DragDropContext>
  );
}
