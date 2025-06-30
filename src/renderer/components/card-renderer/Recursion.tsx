/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';

import Chip from './Chip';
import Div from './Div';
import Draggable from './Draggable';
import Droppable from './Droppable';
import EditButton from './EditButton';
import EditableDiv from './EditableDiv';
import EditableSpan from './EditableSpan';
import Error from './Error';
import H2 from './H2';
import H3 from './H3';
import H4 from './H4';
import H5 from './H5';
import H6 from './H6';
import Mime from './Mime';
import ModifyPageButton from './ModifyPageButton';
import ModifyPagesButton from './ModifyPagesButton';
import P from './P';
import PageLink from './PageLink';
import { PageRendererContext } from './PageRendererContext';
import Section from './Section';
import Span from './Span';
import Text from './Text';
import createKey from './createKey';

export default function Recursion(): JSX.Element {
  const value = useContext(PageRendererContext);
  const {
    baseReference,
    contents,
    edit,
    editable,
    pageIndex,
    layout,
    word,
  } = value;
  return (
    <>
      {contents.map((child, index) => {
        const key = createKey(contents, index, word);
        if (typeof child === 'string') return <Text key={key} text={child} />;
        switch (child.component) {
          case 'chip':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: [] }}>
                <Chip
                  keyword={child.key}
                  value={child.value}
                />
              </PageRendererContext.Provider>
            );
          case 'draggable': {
            const draggableIndex = contents
              .slice(0, index)
              .filter(
                c => typeof c !== 'string' && c.component === 'draggable',
              ).length;
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.contents }}>
                <Draggable
                  draggableId={key}
                  index={draggableIndex}
                />
              </PageRendererContext.Provider>
            );
          }
          case 'droppable':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.contents }}>
                <Droppable
                  droppableId={child.droppableId}
                  type={child.type}
                  editable={editable}
                />
              </PageRendererContext.Provider>
            );
          case 'div':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.contents }}>
                <Div />
              </PageRendererContext.Provider>
            );
          case 'edit-button':
            return (
              <EditButton
                className={child.class}
                edit={edit}
                editable={editable}
              />
            );
          case 'h2':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.contents }}>
                <H2 />
              </PageRendererContext.Provider>
            );
          case 'h3':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.contents }}>
                <H3 />
              </PageRendererContext.Provider>
            );
          case 'h4':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.contents }}>
                <H4 />
              </PageRendererContext.Provider>
            );
          case 'h5':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.contents }}>
                <H5 />
              </PageRendererContext.Provider>
            );
          case 'h6':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.contents }}>
                <H6 />
              </PageRendererContext.Provider>
            );
          case 'mime':
            return <Mime key={key} text={child.text} mime={child.mime} />;
          case 'modify-pages-button':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.contents }}>
                <ModifyPagesButton onClick={child.onClick} />
              </PageRendererContext.Provider>
            );
          case 'modify-page-button':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.contents }}>
                <ModifyPageButton onClick={child.onClick} />
              </PageRendererContext.Provider >
            );
          case 'p':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.contents }}>
                <P />
              </PageRendererContext.Provider >
            );
          case 'page-link':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: [] }}>
                <PageLink pageReference={child.pageReference} />
              </PageRendererContext.Provider>
            );
          case 'section':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.contents }}>
                <Section />
              </PageRendererContext.Provider >
            );
          case 'span':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.contents }}>
                <Span />
              </PageRendererContext.Provider >
            );
          case 'editable': {
            switch (child.element) {
              case 'div':
                return (
                  <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.outputs }}>
                    <EditableDiv
                      baseReference={baseReference}
                      inputs={child.inputs}
                      outputs={child.outputs}
                      editable={editable}
                      pageIndex={pageIndex}
                      layout={layout}
                      word={word}
                    />
                  </PageRendererContext.Provider >
                );
              case 'span':
                return (
                  <PageRendererContext.Provider key={key} value={{ ...value, className: child.class, contents: child.outputs }}>
                    <EditableSpan
                      baseReference={baseReference}
                      inputs={child.inputs}
                      outputs={child.outputs}
                      editable={editable}
                      pageIndex={pageIndex}
                      layout={layout}
                      word={word}
                    />
                  </PageRendererContext.Provider >
                );
              default:
                return (
                  <Error key={key}>{`Invalid element: ${
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (child as any).component
                    }`}</Error>
                );
            }
          }
          default:
            return <></>;
        }
      })}
    </>
  );
}
