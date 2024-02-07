import { LayoutCard, FormDivComponent } from 'otamashelf';
import React from 'react';

import { SummaryWord } from '../../SummaryWord';
import { useThemeStore } from '../../contexts/themeContext';

// eslint-disable-next-line import/no-cycle
import RecursionInForm from './RecursionInForm';
import styleJoin from './styleJoin';

interface Props {
  baseReference: string;
  className?: string;
  contents: FormDivComponent[];
  submit: () => void;
  reset: () => void;
  summary: SummaryWord;
  layout: LayoutCard;
  flattenCard: { [key: string]: string };
  setFlattenCard: (flattenCard: { [key: string]: string }) => void;
}

export default function H5InForm({
  baseReference,
  className,
  contents,
  submit,
  reset,
  summary,
  layout,
  flattenCard,
  setFlattenCard,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    <h5 className={styleJoin(theme.style.h5, className)}>
      <RecursionInForm
        baseReference={baseReference}
        contents={contents}
        submit={submit}
        reset={reset}
        summary={summary}
        layout={layout}
        flattenCard={flattenCard}
        setFlattenCard={setFlattenCard}
      />
    </h5>
  );
}
H5InForm.defaultProps = {
  className: '',
};
