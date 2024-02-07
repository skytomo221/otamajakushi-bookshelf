/* eslint-disable import/no-cycle */
import { LayoutCard, FormDivComponent } from 'otamashelf';
import React from 'react';

import { SummaryWord } from '../../SummaryWord';

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

interface Props {
  baseReference: string;
  contents: FormDivComponent[];
  submit: () => void;
  reset: () => void;
  summary: SummaryWord;
  layout: LayoutCard;
  flattenCard: { [key: string]: string };
  setFlattenCard: (flattenCard: { [key: string]: string }) => void;
}

export default function RecursionInForm({
  baseReference,
  contents,
  summary,
  layout,
  submit,
  reset,
  flattenCard,
  setFlattenCard,
}: Props): JSX.Element {
  return (
    <>
      {contents.map((child, index) => {
        const key = createKeyInForm(contents, index, flattenCard);
        if (typeof child === 'string') return <Text key={key} text={child} />;
        switch (child.component) {
          case 'chip':
            return (
              <Chip
                key={key}
                className={child.class}
                keyword={child.key}
                value={child.value}
              />
            );
          case 'div':
            return (
              <DivInForm
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                submit={submit}
                reset={reset}
                summary={summary}
                layout={layout}
                flattenCard={flattenCard}
                setFlattenCard={setFlattenCard}
              />
            );
          case 'h2':
            return (
              <H2InForm
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                submit={submit}
                reset={reset}
                summary={summary}
                layout={layout}
                flattenCard={flattenCard}
                setFlattenCard={setFlattenCard}
              />
            );
          case 'h3':
            return (
              <H3InForm
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                submit={submit}
                reset={reset}
                summary={summary}
                layout={layout}
                flattenCard={flattenCard}
                setFlattenCard={setFlattenCard}
              />
            );
          case 'h4':
            return (
              <H4InForm
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                submit={submit}
                reset={reset}
                summary={summary}
                layout={layout}
                flattenCard={flattenCard}
                setFlattenCard={setFlattenCard}
              />
            );
          case 'h5':
            return (
              <H5InForm
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                submit={submit}
                reset={reset}
                summary={summary}
                layout={layout}
                flattenCard={flattenCard}
                setFlattenCard={setFlattenCard}
              />
            );
          case 'h6':
            return (
              <H6InForm
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                submit={submit}
                reset={reset}
                summary={summary}
                layout={layout}
                flattenCard={flattenCard}
                setFlattenCard={setFlattenCard}
              />
            );
          case 'mime':
            return <Mime key={key} text={child.text} mime={child.mime} />;
          case 'p':
            return (
              <PInForm
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                submit={submit}
                reset={reset}
                summary={summary}
                layout={layout}
                flattenCard={flattenCard}
                setFlattenCard={setFlattenCard}
              />
            );
          case 'span':
            return (
              <SpanInForm
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                submit={submit}
                reset={reset}
                summary={summary}
                layout={layout}
                flattenCard={flattenCard}
                setFlattenCard={setFlattenCard}
              />
            );
          case 'input':
            switch (child.type) {
              case 'reset':
                return (
                  <InputReset
                    key={key}
                    className={child.class}
                    inputId={child.id}
                    value={child.value}
                    reset={reset}
                    summary={summary}
                  />
                );
              case 'submit':
                return (
                  <InputSubmit
                    key={key}
                    className={child.class}
                    inputId={child.id}
                    value={child.value}
                    submit={submit}
                    summary={summary}
                  />
                );
              case 'text':
                return (
                  <InputText
                    key={key}
                    className={child.class}
                    inputId={child.id}
                    name={child.name}
                    reference={child.reference}
                    pattern={child.pattern}
                    summary={summary}
                    flattenCard={flattenCard}
                    setFlattenCard={setFlattenCard}
                  />
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
              <Label
                key={key}
                baseReference={baseReference}
                className={child.class}
                contents={child.contents}
                for={child.for}
                submit={submit}
                reset={reset}
                summary={summary}
                layout={layout}
                flattenCard={flattenCard}
                setFlattenCard={setFlattenCard}
              />
            );
          case 'textarea':
            return (
              <InputTextarea
                key={key}
                className={child.class}
                inputId={child.id}
                name={child.name}
                reference={child.reference}
                placeholder={child.placeholder}
                rows={child.rows}
                cols={child.cols}
                wrap={child.wrap}
                summary={summary}
                flattenCard={flattenCard}
                setFlattenCard={setFlattenCard}
              />
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
