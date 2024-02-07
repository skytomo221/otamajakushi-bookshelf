import * as React from 'react';

import { useSecondarySidebarStore } from '../contexts/secondarySidebarContext';

export const secondarySidebarWidth = 240;

export default function SecondarySidebar(): JSX.Element {
  const secondarySidebar = useSecondarySidebarStore();

  return secondarySidebar ? <li /> : <></>;
}
