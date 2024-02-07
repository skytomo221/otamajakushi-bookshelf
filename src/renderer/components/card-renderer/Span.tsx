import { PageCard, LayoutCard, LayoutComponent } from 'otamashelf';
import React from 'react';

import { SummaryWord } from '../../SummaryWord';
import { useThemeStore } from '../../contexts/themeContext';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';

interface Props {
  baseReference: string;
  className?: string;
  contents: LayoutComponent[];
  edit: () => void;
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}

export default function Span({
  baseReference,
  className,
  contents,
  edit,
  editable,
  summary,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    <span className={styleJoin(theme.style.span, className)}>
      <Recursion
        baseReference={baseReference}
        contents={contents}
        edit={edit}
        editable={editable}
        summary={summary}
        layout={layout}
        word={word}
      />
    </span>
  );
}
Span.defaultProps = {
  className: '',
};
