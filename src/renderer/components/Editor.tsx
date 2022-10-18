import React from 'react';
import { useSelector } from 'react-redux';

import { Mediator } from '../../common/Mediator';
import { State } from '../states/State';

import Hero from './Hero';
import WordTabs from './WordTabs';

export default function Editor(): JSX.Element {
  const selectedWords = useSelector<State, null | Mediator[]>(
    (state: State) => state.selectedWords,
  );

  return selectedWords?.length ? <WordTabs /> : <Hero />;
}
/* <ContentEditable value={text} onChange={setText} /> */
