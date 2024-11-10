import {
  FormDivComponent,
  Layout,
  LayoutComponent,
} from 'otamashelf/LayoutCard';
import { Page } from 'otamashelf/Page';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { NormalPageReference } from 'otamashelf/PageReference';
import React, { useState } from 'react';

import { Mediator } from '../../Mediator';
import { useThemeStore } from '../../contexts/themeContext';

import FormDiv from './FormDiv';
// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';

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
  const [edit, setEdit] = useState(false);
  return edit ? (
    <FormDiv
      baseReference={baseReference}
      inputs={inputs}
      submit={() => setEdit(false)}
      reset={() => setEdit(false)}
      pageIndex={pageIndex}
      layout={layout}
      word={word}
    />
  ) : (
    <div className={styleJoin(theme.EditableDiv, className)}>
      <Recursion
        baseReference={baseReference}
        contents={outputs}
        edit={() => setEdit(true)}
        editable={editable}
        pageIndex={pageIndex}
        layout={layout}
        word={word}
      />
    </div>
  );
}
EditableDiv.defaultProps = {
  className: '',
};
