import { Layout, LayoutComponent } from 'otamashelf/LayoutCard';
import { Page } from 'otamashelf/Page';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { NormalPageReference } from 'otamashelf/PageReference';
import React from 'react';

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
  pageIndex: NormalPageReference & PageDisplayInformation;
  layout: Layout;
  word: Page;
}

export default function H6({
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
    <h6 className={styleJoin(theme.h6, className)}>
      <Recursion
        baseReference={baseReference}
        contents={contents}
        edit={edit}
        editable={editable}
        pageIndex={pageIndex}
        layout={layout}
        word={word}
      />
    </h6>
  );
}
H6.defaultProps = {
  className: '',
};
