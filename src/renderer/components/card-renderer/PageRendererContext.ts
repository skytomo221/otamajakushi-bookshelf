import { Layout, LayoutComponent } from 'otamashelf/LayoutCard';
import { Page } from 'otamashelf/Page';
import { createContext } from 'react';

import { Mediator } from '../../Mediator';

type PageRendererContextType = {
  baseReference: string;
  className: string | undefined;
  contents: LayoutComponent[];
  edit: () => void;
  editable: boolean;
  pageIndex: Mediator['index'];
  layout: Layout;
  word: Page;
};

export const PageRendererContext = createContext<PageRendererContextType>(undefined as never);
