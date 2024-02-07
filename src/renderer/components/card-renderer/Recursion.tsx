/* eslint-disable import/no-cycle */
import { PageCard, LayoutCard, LayoutComponent } from 'otamashelf';
import React from 'react';

import { SummaryWord } from '../../SummaryWord';

import Button from './Button';
import Chip from './Chip';
import Div from './Div';
import Draggable from './Draggable';
import Droppable from './Droppable';
import EditButton from './EditButton';
import EditableDiv from './EditableDiv';
import EditableSpan from './EditableSpan';
import H2 from './H2';
import H3 from './H3';
import H4 from './H4';
import H5 from './H5';
import H6 from './H6';
import Mime from './Mime';
import P from './P';
import Span from './Span';
import Text from './Text';
import createKey from './createKey';

interface Props {
  baseReference: string;
  contents: LayoutComponent[];
  edit: () => void;
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}

export default function Recursion({
  baseReference,
  contents,
  edit,
  editable,
  summary,
  layout,
  word,
}: Props): JSX.Element {
  return (
    <>
      {contents.map((child, index) => {
        const key = createKey(contents, index, word);
        if (typeof child === 'string') return <Text key={key} text={child} />;
        switch (child.component) {
          case 'recursion':
            return (
              <Recursion
                key={key}
                baseReference={baseReference}
                contents={child.contents}
                edit={edit}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'button':
            return (
              <Button
                key={key}
                baseReference={baseReference}
                className={child.class}
                onClick={child.onClick}
                contents={child.contents}
                edit={edit}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'chip':
            return (
              <Chip
                key={key}
                className={child.class}
                keyword={child.key}
                value={child.value}
              />
            );
          case 'draggable': {
            const draggableIndex = contents
              .slice(0, index)
              .filter(
                c => typeof c !== 'string' && c.component === 'draggable',
              ).length;
            return (
              <Draggable
                key={key}
                draggableId={key}
                baseReference={baseReference}
                className={child.class}
                index={draggableIndex}
                contents={child.contents}
                edit={edit}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          }
          case 'droppable':
            return (
              <Droppable
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                droppableId={child.droppableId}
                type={child.type}
                edit={edit}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'div':
            return (
              <Div
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                edit={edit}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'edit-button':
            return (
              <EditButton
                key={key}
                className={child.class}
                edit={edit}
                editable={editable}
              />
            );
          case 'h2':
            return (
              <H2
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                edit={edit}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'h3':
            return (
              <H3
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                edit={edit}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'h4':
            return (
              <H4
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                edit={edit}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'h5':
            return (
              <H5
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                edit={edit}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'h6':
            return (
              <H6
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                edit={edit}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'mime':
            return <Mime key={key} text={child.text} mime={child.mime} />;
          case 'p':
            return (
              <P
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                edit={edit}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'span':
            return (
              <Span
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                edit={edit}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'editable': {
            switch (child.element) {
              case 'div':
                return (
                  <EditableDiv
                    key={key}
                    baseReference={baseReference}
                    inputs={child.inputs}
                    outputs={child.outputs}
                    editable={editable}
                    summary={summary}
                    layout={layout}
                    word={word}
                  />
                );
              case 'span':
                return (
                  <EditableSpan
                    key={key}
                    baseReference={baseReference}
                    inputs={child.inputs}
                    outputs={child.outputs}
                    editable={editable}
                    summary={summary}
                    layout={layout}
                    word={word}
                  />
                );
              default:
                return <></>;
            }
          }
          default:
            return <></>;
        }
      })}
    </>
  );
}
