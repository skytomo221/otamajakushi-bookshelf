import { Layout, LayoutComponent } from 'otamashelf/LayoutCard';
import { Page } from 'otamashelf/Page';
import { PageProperties } from 'otamashelf/PageProperties';
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
  pageProperties: PageProperties;
  layout: Layout;
  word: Page;
}

export default function H3({
  baseReference,
  className,
  contents,
  edit,
  editable,
  pageProperties,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return (
    <h3 className={styleJoin(theme.h3, className)}>
      <Recursion
        baseReference={baseReference}
        contents={contents}
        edit={edit}
        editable={editable}
        pageProperties={pageProperties}
        layout={layout}
        word={word}
      />
    </h3>
  );
}
H3.defaultProps = {
  className: '',
};
