import React from 'react';
import { useSelector } from 'react-redux';

import { Mediator } from '../Mediator';
import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';

import Hero from './Hero';
import WordTabs from './WordTabs';

export default function Editor(): JSX.Element {
  const selectedWords = useSelector<State, null | Mediator[]>(
    (state: State) => state.selectedWords,
  );
  const parameter = useSelector<State, ThemeParameter>(state => state.theme);

  return (
    <div className={parameter.style.editor} style={{ height: '100%' }}>
      {selectedWords?.length ? <WordTabs /> : <Hero />}
    </div>
  );
}
/* <ContentEditable value={text} onChange={setText} /> */
