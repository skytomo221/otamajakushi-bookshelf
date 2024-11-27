import flatten, { unflatten } from 'flat';
import { Layout, FormDivComponent } from 'otamashelf/LayoutCard';
import { NormalPage, Page } from 'otamashelf/Page';
import { PageDisplayInformation } from 'otamashelf/PageDisplayInformation';
import { NormalPageReference } from 'otamashelf/PageReference';
import React, { useContext, useState } from 'react';

import { Mediator, isBookTemplateMediator, isNormalMediator, isPageTemplateMediator } from '../../Mediator';
import { usePagesDispatch } from '../../contexts/pagesContext';
import { useThemeStore } from '../../contexts/themeContext';
import { WordTabIndexContext } from '../../contexts/wordTabIndexContext';

import Error from './Error';
// eslint-disable-next-line import/no-cycle
import RecursionInForm from './RecursionInForm';
import styleJoin from './styleJoin';

const { api } = window;

interface Props {
  baseReference: string;
  className?: string;
  inputs: FormDivComponent[];
  submit: () => void;
  reset: () => void;
  pageIndex: Mediator['index'];
  layout: Layout;
  word: Page;
}

export default function FormDiv({
  baseReference,
  className,
  inputs,
  submit,
  reset,
  pageIndex,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const defaultFlattenCard = flatten(word.data) as { [key: string]: string };
  const [flattenCard, setFlattenCard] = useState(defaultFlattenCard);
  const dispatch = usePagesDispatch();
  const wordTabsIndex = useContext(WordTabIndexContext);
  function onSelectedWordPush(mediator: Mediator) {
    if (isNormalMediator(mediator)) {
      api
        .updatePage(mediator.index.bookPath, mediator.page)
        .then(({ page: newPage, layout: newLayout }) => dispatch({ type: 'UPDATE_PAGE', payload: { ...mediator, page: newPage, layout: newLayout } }));
    } else {
      api
        .layout(mediator.page)
        .then(newLayout => dispatch({ type: 'UPDATE_PAGE_WITH_INDEX', index: wordTabsIndex, payload: { ...mediator, layout: newLayout } }));
    }
  }
  if (typeof flattenCard !== 'object') {
    api.log.error('Layout is invalid.', layout, flattenCard);
    return <Error>レイアウトが無効です。</Error>;
  }
  if (!flattenCard) {
    api.log.error('Layout is null.', layout, flattenCard);
    return <Error>レイアウトがnullです。</Error>;
  }
  return (
    <form className={styleJoin(theme.FormDiv, className)}>
      <RecursionInForm
        baseReference={baseReference}
        contents={inputs}
        pageIndex={pageIndex}
        layout={layout}
        submit={() => {
          submit();
          onSelectedWordPush({
            index: pageIndex,
            layout,
            page: { ...word as NormalPage, data: unflatten(flattenCard) },
          } as Mediator);
        }}
        reset={() => {
          reset();
          setFlattenCard(defaultFlattenCard);
        }}
        flattenCard={defaultFlattenCard}
        setFlattenCard={setFlattenCard}
      />
    </form>
  );
}
FormDiv.defaultProps = {
  className: '',
};
