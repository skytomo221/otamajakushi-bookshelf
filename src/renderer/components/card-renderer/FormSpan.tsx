import flatten, { unflatten } from 'flat';
import { Layout, FormDivComponent } from 'otamashelf/LayoutCard';
import { NormalPage, Page } from 'otamashelf/Page';
import { PageProperties } from 'otamashelf/PageProperties';
import React, { useState } from 'react';

import { Mediator } from '../../Mediator';
import { usePagesDispatch } from '../../contexts/pagesContext';
import { useThemeStore } from '../../contexts/themeContext';

import Error from './Error';
// eslint-disable-next-line import/no-cycle
import RecursionInForm from './RecursionInForm';
import styleJoin from './styleJoin';

const { api } = window;

interface Props {
  baseReference: string;
  className?: string;
  inputs: FormDivComponent[];
  submit: () => void;
  reset: () => void;
  pageProperties: PageProperties;
  layout: Layout;
  word: Page;
}

export default function FormDiv({
  baseReference,
  className,
  inputs,
  submit,
  reset,
  pageProperties,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const defaultFlattenCard = flatten(word.data) as { [key: string]: string };
  const [flattenCard, setFlattenCard] = useState(defaultFlattenCard);
  const dispatch = usePagesDispatch();
  function onSelectedWordPush(mediator: Mediator) {
    api
      .updatePage(mediator.pageProperties.path, mediator.page)
      .then(({ page: newPage, layout: newLayout }) => dispatch({ type: 'UPDATE_PAGE', payload: { ...mediator, page: newPage, layout: newLayout } }));
  }
  if (typeof flattenCard !== 'object') {
    api.log.error('Layout is invalid.', layout, flattenCard);
    return <Error>レイアウトが無効です。</Error>;
  }
  if (!flattenCard) {
    api.log.error('Layout is null.', layout, flattenCard);
    return <Error>レイアウトがnullです。</Error>;
  }
  return (
    <span className={styleJoin(theme.FormSpan, className)}>
      <RecursionInForm
        baseReference={baseReference}
        contents={inputs}
        pageProperties={pageProperties}
        layout={layout}
        submit={() => {
          submit();
          onSelectedWordPush({
            pageProperties,
            layout,
            page: { ...word as NormalPage, data: unflatten(flattenCard) },
          });
        }}
        reset={() => {
          reset();
          setFlattenCard(defaultFlattenCard);
        }}
        flattenCard={defaultFlattenCard}
        setFlattenCard={setFlattenCard}
      />
    </span>
  );
}
FormDiv.defaultProps = {
  className: '',
};
