import { Layout, FormDivComponent } from 'otamashelf/LayoutCard';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { NormalPageReference } from 'otamashelf/PageReference';
import React from 'react';

import { Mediator } from '../../Mediator';
import { useThemeStore } from '../../contexts/themeContext';

// eslint-disable-next-line import/no-cycle
import RecursionInForm from './RecursionInForm';
import styleJoin from './styleJoin';

interface Props {
  baseReference: string;
  className?: string;
  contents?: FormDivComponent[];
  for: string;
  submit: () => void;
  reset: () => void;
  pageIndex: Mediator['index'];
  layout: Layout;
  flattenCard: { [key: string]: string };
  setFlattenCard: (flattenCard: { [key: string]: string }) => void;
}

export default function H5InForm({
  baseReference,
  className,
  for: htmlFor,
  contents,
  submit,
  reset,
  pageIndex,
  layout,
  flattenCard,
  setFlattenCard,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      htmlFor={JSON.stringify({ pageIndex, htmlFor })}
      className={styleJoin(theme.label, className)}>
      <RecursionInForm
        baseReference={baseReference}
        contents={contents ?? []}
        submit={submit}
        reset={reset}
        pageIndex={pageIndex}
        layout={layout}
        flattenCard={flattenCard}
        setFlattenCard={setFlattenCard}
      />
    </label>
  );
}
H5InForm.defaultProps = {
  className: '',
  contents: [],
};
