/* eslint-disable import/no-cycle */
import { PageCard, LayoutCard, LayoutComponent } from 'otamashelf';
import React from 'react';

import { SummaryWord } from '../../SummaryWord';

import Button from './Button';
import Chip from './Chip';
import Div from './Div';
import Draggable from './Draggable';
import Droppable from './Droppable';
import H2 from './H2';
import H3 from './H3';
import H4 from './H4';
import H5 from './H5';
import H6 from './H6';
import NotPlain from './NotPlain';
import P from './P';
import Plain from './Plain';
import Span from './Span';
import createKey from './createKey';

interface Props {
  baseReference: string;
  contents: LayoutComponent[];
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}

export default function Recursion({
  baseReference,
  contents,
  editable,
  summary,
  layout,
  word,
}: Props): JSX.Element {
  return (
    <>
      {contents.map((child, index) => {
        const key = createKey(contents, index, word);
        switch (child.component) {
          case 'recursion':
            return (
              <Recursion
                key={key}
                baseReference={baseReference}
                contents={child.contents}
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
                baseReference={baseReference}
                className={child.class}
                keyword={child.key}
                value={child.value}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'draggable': {
            const draggableIndex = contents
              .slice(0, index)
              .filter(c => c.component === 'draggable').length;
            return (
              <Draggable
                key={key}
                draggableId={key}
                baseReference={baseReference}
                className={child.class}
                reference={child.reference}
                index={draggableIndex}
                contents={child.contents}
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
                reference={child.reference}
                type={child.type}
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
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'h2':
            return (
              <H2
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
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
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'p':
            return (
              <P
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
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
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'text': {
            if (child.mime === 'text/plain') {
              return (
                <Plain
                  key={key}
                  text={child.text}
                  editable={editable}
                  layout={layout}
                />
              );
            }
            return (
              <NotPlain
                key={key}
                text={child.text}
                mime={child.mime}
                editable={editable}
                layout={layout}
              />
            );
          }
          case 'reference': {
            if (child.mime === 'text/plain') {
              return (
                <Plain
                  key={key}
                  reference={
                    child.reference.startsWith('.')
                      ? baseReference + child.reference
                      : child.reference
                  }
                  editable={editable}
                  summary={summary}
                  layout={layout}
                  word={word}
                />
              );
            }
            return (
              <NotPlain
                key={key}
                reference={
                  child.reference.startsWith('.')
                    ? baseReference + child.reference
                    : child.reference
                }
                mime={child.mime}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          }
          default:
            return <></>;
        }
      })}
    </>
  );
}
