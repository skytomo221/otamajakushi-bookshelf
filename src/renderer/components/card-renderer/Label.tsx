import { Layout, FormDivComponent } from 'otamashelf/LayoutCard';
import { PageProperties } from 'otamashelf/PageProperties';
import React from 'react';

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
  pageProperties: PageProperties;
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
  pageProperties,
  layout,
  flattenCard,
  setFlattenCard,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      htmlFor={`${pageProperties.path} ${pageProperties.id} ${htmlFor}`}
      className={styleJoin(theme.label, className)}>
      <RecursionInForm
        baseReference={baseReference}
        contents={contents ?? []}
        submit={submit}
        reset={reset}
        pageProperties={pageProperties}
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
