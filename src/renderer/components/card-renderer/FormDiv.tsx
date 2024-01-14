import flatten, { unflatten } from 'flat';
import {
  PageCard,
  LayoutCard,
  FormDivComponent,
} from 'otamashelf';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Mediator } from '../../Mediator';
import { SummaryWord } from '../../SummaryWord';
import { pushSelectedWordAction } from '../../actions/SelectedWordsActions';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

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
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  const dispatch = useDispatch();
  const defaultFlattenCard = flatten(word) as { [key: string]: string };
  const [flattenCard, setFlattenCard] = useState(defaultFlattenCard);
  const onSelectedWordPush = React.useCallback((mediator: Mediator) => {
    dispatch(pushSelectedWordAction(mediator));
  }, []);
  if (typeof flattenCard !== 'object') {
    api.log.error('Layout is invalid.', layout, flattenCard);
    return <Error>レイアウトが無効です。</Error>;
  }
  if (!flattenCard) {
    api.log.error('Layout is null.', layout, flattenCard);
    return <Error>レイアウトがnullです。</Error>;
  }
  return (
    <form className={styleJoin(theme.style.FormDiv, className)}>
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
    </form>
  );
}
FormDiv.defaultProps = {
  className: '',
};
