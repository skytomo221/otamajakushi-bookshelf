import { Layout, LayoutComponent } from 'otamashelf/LayoutCard';
import { Page } from 'otamashelf/Page';
import { PageProperties } from 'otamashelf/PageProperties';
import React from 'react';

import { usePagesDispatch } from '../../contexts/pagesContext';
import { useThemeStore } from '../../contexts/themeContext';
import '../../renderer';

// eslint-disable-next-line import/no-cycle
import Recursion from './Recursion';
import styleJoin from './styleJoin';

import { Json } from 'otamashelf/Json';


const { api } = window;

interface Props {
  baseReference: string;
  className?: string;
  contents: LayoutComponent[];
  onClick: {
    id: string;
    script: Json;
  };
  edit: () => void;
  editable: boolean;
  pageProperties: PageProperties;
  layout: Layout;
  word: Page;
}

export default function ModifyPageButton({
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
  const onClick = React.useCallback(
    (
      s: PageProperties,
      c: {
        id: string;
        script: Json;
      },
    ) => {
      api
        .modifyPage(s.path, s.id, c.id, c.script)
        .then(({ page: newPage, layout: newLayout }) => dispatch({ type: 'UPDATE_PAGE', payload: { pageProperties, page: newPage, layout: newLayout } }));
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
ModifyPageButton.defaultProps = {
  className: '',
};
