import * as React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../states/State';

export const secondarySidebarWidth = 240;

export default function SecondarySidebar(): JSX.Element {
  const secondarySidebar = useSelector<State, null | string>(
    (state: State) => state.secondarySidebar,
  );

  return secondarySidebar ? <li /> : <></>;
}
