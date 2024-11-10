import { Layout, LayoutComponent } from 'otamashelf/LayoutCard';
import { Page } from 'otamashelf/Page';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { NormalPageReference } from 'otamashelf/PageReference';
import React from 'react';

import { Mediator } from '../../Mediator';
import { useThemeStore } from '../../contexts/themeContext';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';

interface Props {
  baseReference: string;
  className?: string;
  contents: LayoutComponent[];
  edit: () => void;
  editable: boolean;
  pageIndex: Mediator['index'];
  layout: Layout;
  word: Page;
}

export default function Div({
  baseReference,
  className,
  contents,
  edit,
  editable,
  pageIndex,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    <div className={styleJoin(theme.div, className)}>
      <Recursion
        baseReference={baseReference}
        contents={contents}
        edit={edit}
        editable={editable}
        pageIndex={pageIndex}
        layout={layout}
        word={word}
      />
    </div>
  );
}
Div.defaultProps = {
  className: '',
};
