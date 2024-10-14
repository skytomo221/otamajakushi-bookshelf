import { Layout, LayoutComponent } from 'otamashelf/LayoutCard';
import { Page } from 'otamashelf/Page';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { NormalPageReference } from 'otamashelf/PageReference';
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
  pageIndex: NormalPageReference & PageDisplayInformation;
  layout: Layout;
  word: Page;
}

export default function ModifyPagesButton({
  baseReference,
  className,
  contents,
  onClick: onClickButton,
  edit,
  editable,
  pageIndex,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const dispatch = usePagesDispatch();
  const onClick = React.useCallback(
    (
      s: NormalPageReference & PageDisplayInformation,
      c: {
        id: string;
        script: Json;
      },
    ) => {
      api
        .modifyPages(s.bookPath, s.pageId, c.id, c.script)
        .then(({ page: newPage, layout: newLayout }) => dispatch({ type: 'UPDATE_PAGE', payload: { index: pageIndex, page: newPage, layout: newLayout } }));
    },
    [],
  );
  return editable ? (
    <button
      aria-label="Save"
      className={styleJoin(theme.button, className)}
      onClick={() => {
        onClick(pageIndex, onClickButton);
      }}
      type="submit">
      <Recursion
        baseReference={baseReference}
        contents={contents}
        edit={edit}
        editable={editable}
        pageIndex={pageIndex}
        layout={layout}
        word={word}
      />
    </button>
  ) : (
    <></>
  );
}
ModifyPagesButton.defaultProps = {
  className: '',
};
