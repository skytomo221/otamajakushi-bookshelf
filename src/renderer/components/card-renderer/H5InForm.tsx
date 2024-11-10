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
  contents: FormDivComponent[];
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
    <h5 className={styleJoin(theme.h5, className)}>
      <RecursionInForm
        baseReference={baseReference}
        contents={contents}
        submit={submit}
        reset={reset}
        pageIndex={pageIndex}
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
