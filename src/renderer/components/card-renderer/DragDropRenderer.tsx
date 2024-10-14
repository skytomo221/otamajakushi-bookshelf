import flatten, { unflatten } from 'flat';
import { Layout } from 'otamashelf/LayoutCard';
import { NormalPage, Page } from 'otamashelf/Page';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { NormalPageReference } from 'otamashelf/PageReference';
import React, { ReactNode } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { Mediator } from '../../Mediator';
import { usePagesDispatch } from '../../contexts/pagesContext';

const { api } = window;

type Props = {
  pageIndex: NormalPageReference & PageDisplayInformation;
  word: Page;
  layout: Layout;
  children: ReactNode;
};
export default function DragDropRenderer({
  pageIndex,
  word,
  layout,
  children,
}: Props): JSX.Element {
  const dispatch = usePagesDispatch();
  function onSelectedWordPush(mediator: Mediator) {
    api
      .updatePage(mediator.index.bookPath, mediator.page)
      .then(({ page: newPage, layout: newLayout }) => dispatch({ type: 'UPDATE_PAGE', payload: { ...mediator, page: newPage, layout: newLayout } }));
  }
  const flat = flatten(word.data) as { [name: string]: unknown };
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
          index: pageIndex,
          layout,
          page: { ...word as NormalPage, data: unflatten(newFlat) },
        });
      }}>
      {children}
    </DragDropContext>
  );
}
