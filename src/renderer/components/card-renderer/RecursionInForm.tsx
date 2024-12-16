/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';

import Chip from './Chip';
import DivInForm from './DivInForm';
import Error from './Error';
import H2InForm from './H2InForm';
import H3InForm from './H3InForm';
import H4InForm from './H4InForm';
import H5InForm from './H5InForm';
import H6InForm from './H6InForm';
import InputReset from './InputReset';
import InputSubmit from './InputSubmit';
import InputText from './InputText';
import InputTextarea from './InputTextarea';
import Label from './Label';
import Mime from './Mime';
import PInForm from './PInForm';
import SpanInForm from './SpanInForm';
import Text from './Text';
import createKeyInForm from './createKeyInForm';
import { PageRendererContext } from './PageRendererContext';
import { PageRendererInFormContext } from './PageRendererInFormContext';

export default function RecursionInForm(): JSX.Element {
  const value = useContext(PageRendererContext);
  const { pageIndex, layout, baseReference } = value;
  const valueInForm = useContext(PageRendererInFormContext);
  const { inputs, flattenCard, submit, reset } = valueInForm;
  return (
    <>
      {inputs.map((child, index) => {
        const key = createKeyInForm(inputs, index, flattenCard);
        if (typeof child === 'string') return <Text key={key} text={child} />;
        switch (child.component) {
          case 'chip':
            return (
              <PageRendererContext.Provider value={{ ...value, className: child.class }}>
                <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: [] }}>
                  <Chip
                    key={key}
                    keyword={child.key}
                    value={child.value}
                  />
                </PageRendererInFormContext.Provider>
              </PageRendererContext.Provider>
            );
          case 'div':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class }}>
                <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: child.contents }}>
                  <DivInForm />
                </PageRendererInFormContext.Provider>
              </PageRendererContext.Provider>
            );
          case 'h2':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class }}>
                <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: child.contents }}>
                  <H2InForm />
                </PageRendererInFormContext.Provider>
              </PageRendererContext.Provider >
            );
          case 'h3':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class }}>
                <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: child.contents }}>
                  <H3InForm />
                </PageRendererInFormContext.Provider>
              </PageRendererContext.Provider >
            );
          case 'h4':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class }}>
                <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: child.contents }}>
                  <H4InForm />
                </PageRendererInFormContext.Provider>
              </PageRendererContext.Provider >
            );
          case 'h5':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class }}>
                <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: child.contents }}>
                  <H5InForm />
                </PageRendererInFormContext.Provider>
              </PageRendererContext.Provider >
            );
          case 'h6':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class }}>
                <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: child.contents }}>
                  <H6InForm />
                </PageRendererInFormContext.Provider>
              </PageRendererContext.Provider >
            );
          case 'mime':
            return <Mime key={key} text={child.text} mime={child.mime} />;
          case 'p':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class }}>
                <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: child.contents }}>
                  <PInForm />
                </PageRendererInFormContext.Provider>
              </PageRendererContext.Provider >
            );
          case 'span':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class }}>
                <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: child.contents }}>
                  <SpanInForm key={key} />
                </PageRendererInFormContext.Provider>
              </PageRendererContext.Provider >
            );
          case 'input':
            switch (child.type) {
              case 'reset':
                return (
                  <PageRendererContext.Provider key={key} value={{ ...value, className: child.class }}>
                    <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: [] }}>
                      <InputReset
                        inputId={child.id}
                        value={child.value}
                      />
                    </PageRendererInFormContext.Provider>
                  </PageRendererContext.Provider >
                );
              case 'submit':
                return (
                  <PageRendererContext.Provider key={key} value={{ ...value, className: child.class }}>
                    <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: [] }}>
                      <InputSubmit
                        inputId={child.id}
                        value={child.value}
                      />
                    </PageRendererInFormContext.Provider>
                  </PageRendererContext.Provider >
                );
              case 'text':
                return (
                  <PageRendererContext.Provider key={key} value={{ ...value, className: child.class }}>
                    <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: [] }}>
                      <InputText
                        inputId={child.id}
                        name={child.name}
                        reference={child.reference}
                        pattern={child.pattern}
                      />
                    </PageRendererInFormContext.Provider>
                  </PageRendererContext.Provider >
                );
              default:
                return (
                  <Error key={key}>
                    input type={child.type}
                    はサポートされていないコンポーネントです。
                  </Error>
                );
            }
          case 'label':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class }}>
                <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: child.contents }}>
                  <Label for={child.for} />
                </PageRendererInFormContext.Provider>
              </PageRendererContext.Provider >
            );
          case 'textarea':
            return (
              <PageRendererContext.Provider key={key} value={{ ...value, className: child.class }}>
                <PageRendererInFormContext.Provider value={{ ...valueInForm, inputs: [] }}>
                  <InputTextarea
                    key={key}
                    inputId={child.id}
                    name={child.name}
                    reference={child.reference}
                    placeholder={child.placeholder}
                    rows={child.rows}
                    cols={child.cols}
                    wrap={child.wrap}
                  />
                </PageRendererInFormContext.Provider>
              </PageRendererContext.Provider >
            );
          default:
            return (
              <Error key={key}>
                {child.component}はサポートされていないコンポーネントです。
              </Error>
            );
        }
      })}
    </>
  );
}
