import {
  FormDivComponent,
  Layout,
  LayoutComponent,
} from 'otamashelf/LayoutCard';
import { Page } from 'otamashelf/Page';
import React, { useContext, useState } from 'react';

import { Mediator } from '../../Mediator';
import { useThemeStore } from '../../contexts/themeContext';

import FormDiv from './FormDiv';
// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';
import { PageRendererContext } from './PageRendererContext';
import { PageRendererInFormContext } from './PageRendererInFormContext';

interface Props {
  baseReference: string;
  className?: string;
  inputs: FormDivComponent[];
  outputs: LayoutComponent[];
  editable: boolean;
  pageIndex: Mediator['index'];
  layout: Layout;
  word: Page;
}

export default function EditableDiv({
  baseReference,
  className,
  inputs,
  outputs,
  editable,
  pageIndex,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const value = useContext(PageRendererContext);
  const [edit, setEdit] = useState(false);
  return edit ? (
    <PageRendererContext.Provider value={{ ...value, edit: () => setEdit(true) }}>
      <FormDiv
        baseReference={baseReference}
        inputs={inputs}
        submit={() => setEdit(false)}
        reset={() => setEdit(false)}
        pageIndex={pageIndex}
        layout={layout}
        word={word}
      />
    </PageRendererContext.Provider>
  ) : (
    <PageRendererContext.Provider value={{ ...value, edit: () => setEdit(true) }}>
      <div className={styleJoin(theme.EditableDiv, className)}>
        <Recursion />
      </div>
    </PageRendererContext.Provider>
  );
}
EditableDiv.defaultProps = {
  className: '',
};
