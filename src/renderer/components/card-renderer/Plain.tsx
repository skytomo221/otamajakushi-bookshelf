import flatten, { unflatten } from 'flat';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LayoutCard } from '../../../common/LayoutCard';
import { WordCard } from '../../../common/WordCard';
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

export default function Plain(
  props:
    | {
        text: string;
        layout: LayoutCard;
      }
    | {
        reference: string;
        editable: boolean;
        summary: SummaryWord;
        layout: LayoutCard;
        word: WordCard;
      },
): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  const dispatch = useDispatch();
  const onSelectedWordPush = React.useCallback((mediator: Mediator) => {
    dispatch(pushSelectedWordAction(mediator));
  }, []);
  if ('text' in props) {
    const { text } = props;
    if (text) return <span className={theme.style.span}>{text}</span>;
  }
  if ('reference' in props) {
    const { editable } = props;
    const { reference, summary, word, layout } = props;
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
          flattenCard[reference]
        )}
      </span>
    );
  }
  api.log.error('reference and text is undifined.');
  return <></>;
}
