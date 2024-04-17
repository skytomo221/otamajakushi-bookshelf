import { Layout, LayoutComponent } from 'otamashelf/LayoutCard';
import { Page } from 'otamashelf/Page';
import { PageProperties } from 'otamashelf/PageProperties';
import React from 'react';

import { usePagesDispatch } from '../../contexts/pagesContext';
import { useThemeStore } from '../../contexts/themeContext';
import '../../renderer';
// eslint-disable-next-line import/no-cycle
import { useWorkbenchStore } from '../../contexts/workbenchContext';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';


const { api } = window;

interface Props {
  baseReference: string;
  className?: string;
  contents: LayoutComponent[];
  onClick: {
    type: string;
    id: string;
    script: string;
  };
  edit: () => void;
  editable: boolean;
  pageProperties: PageProperties;
  layout: Layout;
  word: Page;
}

export default function Button({
  baseReference,
  className,
  contents,
  onClick: onClickButton,
  edit,
  editable,
  pageProperties,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const dispatch = usePagesDispatch();
  const workbenches = useWorkbenchStore();
  const index = workbenches.findIndex(
    workbench => workbench.path === pageProperties.path,
  );
  const onClick = React.useCallback(
    (
      s: PageProperties,
      c: {
        type: string;
        id: string;
        script: string;
      },
    ) => {
      api
        .modifyPage(s.path, s.id, c)
        .then(mediator => dispatch({ type: 'UPDATE_PAGE', payload: mediator }));
    },
    [],
  );
  return editable ? (
    <button
      aria-label="Save"
      className={styleJoin(theme.button, className)}
      onClick={() => {
        onClick(pageProperties, onClickButton);
      }}
      type="submit">
      <Recursion
        baseReference={baseReference}
        contents={contents}
        edit={edit}
        editable={editable}
        pageProperties={pageProperties}
        layout={layout}
        word={word}
      />
    </button>
  ) : (
    <></>
  );
}
Button.defaultProps = {
  className: '',
};
