import { Layout, LayoutComponent } from 'otamashelf/LayoutCard';
import { Page } from 'otamashelf/Page';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import React from 'react';
import { Draggable as RawDraggable } from 'react-beautiful-dnd';

import { useThemeStore } from '../../contexts/themeContext';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import { NormalPageReference } from 'otamashelf/PageReference';

interface Props {
  draggableId: string;
  index: number;
  baseReference: string;
  className?: string;
  contents: LayoutComponent[];
  edit: () => void;
  editable: boolean;
  pageIndex: NormalPageReference & PageDisplayInformation;
  layout: Layout;
  word: Page;
}

export default function Draggable({
  draggableId,
  index,
  baseReference,
  contents,
  edit,
  editable,
  pageIndex,
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
              ? theme['DraggableArray.Draggable.Dragging']
              : theme['DraggableArray.Draggable']
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
            pageIndex={pageIndex}
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
