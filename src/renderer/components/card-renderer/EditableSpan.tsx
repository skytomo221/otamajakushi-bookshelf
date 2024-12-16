import {
  Layout,
  LayoutComponent,
  FormSpanComponent,
} from 'otamashelf/LayoutCard';
import { Page } from 'otamashelf/Page';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { NormalPageReference } from 'otamashelf/PageReference';
import React, { useContext, useState } from 'react';

import { Mediator } from '../../Mediator';
import { useThemeStore } from '../../contexts/themeContext';

import FormSpan from './FormSpan';
// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';
import { PageRendererContext } from './PageRendererContext';

interface Props {
  baseReference: string;
  className?: string;
  inputs: FormSpanComponent[];
  outputs: LayoutComponent[];
  editable: boolean;
  pageIndex: Mediator['index'];
  layout: Layout;
  word: Page;
}

export default function EditableSpan({
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
      <FormSpan
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
      <span className={styleJoin(theme.EditableSpan, className)}>
        <Recursion />
      </span>
    </PageRendererContext.Provider>
  );
}
EditableSpan.defaultProps = {
  className: '',
};
