import { LayoutCard, FormDivComponent } from 'otamashelf';
import React from 'react';
import { useSelector } from 'react-redux';

import { SummaryWord } from '../../SummaryWord';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

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

export default function SpanInForm({
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
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return (
    <span className={styleJoin(theme.style.span, className)}>
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
    </span>
  );
}
SpanInForm.defaultProps = {
  className: '',
};
