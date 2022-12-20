/* eslint-disable import/no-cycle */
import React from 'react';

import { LayoutComponent, LayoutCard } from '../../../common/LayoutCard';
import { PageCard } from '../../../common/PageCard';
import { SummaryWord } from '../../SummaryWord';

import Array from './Array';
import Button from './Button';
import Chip from './Chip';
import Div from './Div';
import DraggableArray from './DraggableArray';
import H2 from './H2';
import H3 from './H3';
import H4 from './H4';
import H5 from './H5';
import H6 from './H6';
import Markdown from './Markdown';
import P from './P';
import Plain from './Plain';
import Span from './Span';

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
      {contents.map(child => {
        switch (child.component) {
          case 'recursion':
            return (
              <Recursion
                baseReference={baseReference}
                contents={child.contents}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'array':
            return (
              <Array
                baseReference={child.baseReference}
                content={child.content}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'button':
            return (
              <Button
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
          case 'draggable-array':
            return (
              <DraggableArray
                baseReference={child.baseReference}
                content={child.content}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'div':
            return (
              <Div
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
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'text/plain':
            return 'text' in child ? (
              <Plain text={child.text} editable={editable} layout={layout} />
            ) : (
              <Plain
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
          case 'text/markdown':
            return 'text' in child ? (
              <Markdown text={child.text} editable={editable} layout={layout} />
            ) : (
              <Markdown
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
          default:
            return <></>;
        }
      })}
    </>
  );
}
