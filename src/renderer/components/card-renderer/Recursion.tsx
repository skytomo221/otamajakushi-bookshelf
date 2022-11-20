/* eslint-disable import/no-cycle */
import React from 'react';

import { LayoutComponent, LayoutCard } from '../../../common/LayoutCard';
import { WordCard } from '../../../common/WordCard';
import { SummaryWord } from '../../SummaryWord';

import Chip from './Chip';
import H2 from './H2';
import H3 from './H3';
import H4 from './H4';
import H5 from './H5';
import H6 from './H6';
import Markdown from './Markdown';
import Plain from './Plain';
import Span from './Span';

interface Props {
  contents: LayoutComponent[];
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: WordCard;
}

export default function Recursion({
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
                className={child.class}
                keyword={child.key}
                value={child.value}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'h2':
            return (
              <H2
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
                reference={child.reference}
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
                reference={child.reference}
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
