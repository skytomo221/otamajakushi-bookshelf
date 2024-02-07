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

export default function H2({
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
    <h2 className={styleJoin(theme.style.h2, className)}>
      <Recursion
        baseReference={baseReference}
        contents={contents}
        edit={edit}
        editable={editable}
        summary={summary}
        layout={layout}
        word={word}
      />
    </h2>
  );
}
H2.defaultProps = {
  className: '',
};
