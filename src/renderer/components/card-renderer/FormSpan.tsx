import flatten, { unflatten } from 'flat';
import {
  PageCard,
  LayoutCard,
  FormDivComponent,
} from 'otamashelf';
import React, { useState } from 'react';

import { Mediator } from '../../Mediator';
import { SummaryWord } from '../../SummaryWord';
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
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}

export default function FormDiv({
  baseReference,
  className,
  inputs,
  submit,
  reset,
  summary,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const defaultFlattenCard = flatten(word) as { [key: string]: string };
  const [flattenCard, setFlattenCard] = useState(defaultFlattenCard);
  const dispatch = usePagesDispatch();
  function onSelectedWordPush(mediator: Mediator) {
    api
      .updatePage(mediator.summary, mediator.word)
      .then(m => dispatch({ type: 'UPDATE_PAGE', payload: m }));
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
    <span className={styleJoin(theme.style.FormSpan, className)}>
      <RecursionInForm
        baseReference={baseReference}
        contents={inputs}
        summary={summary}
        layout={layout}
        submit={() => {
          submit();
          onSelectedWordPush({
            summary,
            layout,
            word: unflatten(flattenCard),
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
