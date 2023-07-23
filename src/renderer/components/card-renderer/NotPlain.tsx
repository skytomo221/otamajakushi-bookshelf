import flatten, { unflatten } from 'flat';
import {
  PageCard,
  LayoutCard,
  ExtensionProperties,
  TextConverterProperties,
} from 'otamashelf';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Mediator } from '../../Mediator';
import { SummaryWord } from '../../SummaryWord';
import { pushSelectedWordAction } from '../../actions/SelectedWordsActions';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

const { api } = window;

function TextFeild({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  const [text, setText] = useState(value);
  const [edit, setEdit] = useState(false);
  return (
    <>
      {edit ? (
        <input
          value={text}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
            setText(e.target.value);
          }}
        />
      ) : (
        text
      )}
      <button
        type="submit"
        className={theme.style.button}
        onClick={() => {
          if (edit) {
            onChange(text);
          }
          setEdit(!edit);
        }}>
        {edit ? '確定' : '編集'}
      </button>
    </>
  );
}

export default function NotPlain(
  props:
    | {
        text: string;
        mime: string;
        layout: LayoutCard;
      }
    | {
        reference: string;
        mime: string;
        editable: boolean;
        summary: SummaryWord;
        layout: LayoutCard;
        word: PageCard;
      },
): JSX.Element {
  const extensions = useSelector<State, ExtensionProperties[]>(
    (state: State) => state.extensions,
  );
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  const dispatch = useDispatch();
  const onSelectedWordPush = React.useCallback((mediator: Mediator) => {
    dispatch(pushSelectedWordAction(mediator));
  }, []);
  if ('text' in props) {
    const { text, mime } = props;
    const converterPropertiesList = extensions
      .filter(
        (ext): ext is TextConverterProperties => ext.type === 'text-converter',
      )
      .filter(ext => ext.mime === mime);
    if (converterPropertiesList.length === 0) {
      api.log.error('Text conver is not found.');
      return <></>;
    }
    const [innerHtml, setInnerHtml] = useState('');
    useEffect(() => {
      const convertText = async () => {
        const convertReturns = await api.convertHtml(
          converterPropertiesList[0].id,
          {
            action: 'convert',
            text,
          },
        );
        if (convertReturns.status === 'reject') {
          api.log.error('Text convert is rejected.', text);
          return;
        }
        const { returns: { html } } = convertReturns;
        setInnerHtml(html);
      };
      convertText();
    }, []);
    if (text)
      return (
        <p
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: innerHtml }}
        />
      );
  }
  if ('reference' in props) {
    const { editable } = props;
    const { reference, mime, summary, word, layout } = props;
    const flattenCard = flatten(word) as { [key: string]: string };
    if (typeof flattenCard !== 'object') {
      api.log.error('Layout layout is invalid.', layout, flattenCard);
      return <></>;
    }
    if (!flattenCard) {
      api.log.error('Layout layout is null.', layout, flattenCard);
      return <></>;
    }
    if (!(reference in flattenCard)) {
      api.log.error('Reference is null.', layout, flattenCard, reference);
      return <></>;
    }
    if (
      reference in flattenCard &&
      typeof flattenCard[reference] !== 'string'
    ) {
      api.log.error(
        'Reference is not string.',
        layout,
        flattenCard,
        flattenCard[reference],
      );
      return <></>;
    }
    const converterPropertiesList = extensions
      .filter(
        (ext): ext is TextConverterProperties => ext.type === 'text-converter',
      )
      .filter(ext => ext.mime === mime);
    if (converterPropertiesList.length === 0) {
      api.log.error('Text conver is not found.');
      return <></>;
    }
    const [innerHtml, setInnerHtml] = useState('');
    useEffect(() => {
      const convertText = async () => {
        const convertReturns = await api.convertHtml(
          converterPropertiesList[0].id,
          {
            action: 'convert',
            text: flattenCard[reference],
          },
        );
        if (convertReturns.status === 'reject') {
          api.log.error(
            'Text convert is rejected.',
            layout,
            flattenCard,
            flattenCard[reference],
          );
          return;
        }
        const { returns: { html } } = convertReturns;
        setInnerHtml(html);
      };
      convertText();
    }, []);
    return (
      <span>
        {editable ? (
          <TextFeild
            value={flattenCard[reference]}
            onChange={value => {
              onSelectedWordPush({
                summary,
                layout,
                word: unflatten({
                  // eslint-disable-next-line @typescript-eslint/ban-types
                  ...(flatten(word) as object),
                  [reference]: value,
                }),
              });
            }}
          />
        ) : (
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: innerHtml }}
          />
        )}
      </span>
    );
  }
  api.log.error('reference and text is undifined.');
  return <></>;
}
