import {
  Box,
  Button,
  Chip,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { flatten, unflatten } from 'flat';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LayoutCard, LayoutComponent } from '../LayoutCard';
import { Mediator } from '../Mediator';
import { WordCard } from '../WordCard';
import { pushSelectedWordAction } from '../actions/SelectedWordsActions';
import { State } from '../states/State';
import { SummaryWord } from '../SummaryWord';

const { api } = window;

function OtamaRecursion({
  contents,
  editable,
  summary,
  layout,
  word,
}: {
  contents: LayoutComponent[];
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: WordCard;
}): JSX.Element {
  return (
    <>
      {contents.map((child, index) => {
        switch (child.component) {
          case 'recursion':
            return (
              <OtamaRecursion
                contents={child.contents}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'chip':
            return (
              <OtamaChip
                label={child.label}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'form':
            return (
              <OtamaForm
                contents={child.contents}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'title':
            return (
              <OtamaTitle
                contents={child.contents}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'body1':
            return (
              <OtamaBody1
                contents={child.contents}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'body2':
            return (
              <OtamaBody2
                contents={child.contents}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          case 'string':
            return 'text' in child ? (
              <OtamaString
                text={child.text}
                editable={editable}
                layout={layout}
              />
            ) : (
              <OtamaString
                reference={child.reference}
                editable={editable}
                summary={summary}
                layout={layout}
                word={word}
              />
            );
          default:
            return <></>;
        }
      })}
    </>
  );
}

function OtamaChip({
  label,
  editable,
  summary,
  layout,
  word,
}: {
  label: string;
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: WordCard;
}): JSX.Element {
  const theme = useTheme();
  return <Chip variant="outlined" size="small" sx={theme.chip} label={label} />;
}

function OtamaForm({
  contents,
  editable,
  summary,
  layout,
  word,
}: {
  contents: LayoutComponent[];
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: WordCard;
}): JSX.Element {
  return (
    <Typography variant="h2">
      <OtamaRecursion
        contents={contents}
        editable={editable}
        summary={summary}
        layout={layout}
        word={word}
      />
    </Typography>
  );
}

function OtamaTitle({
  contents,
  editable,
  summary,
  layout,
  word,
}: {
  contents: LayoutComponent[];
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: WordCard;
}): JSX.Element {
  return (
    <Typography variant="h3">
      <OtamaRecursion
        contents={contents}
        editable={editable}
        summary={summary}
        layout={layout}
        word={word}
      />
    </Typography>
  );
}

function OtamaBody1({
  contents,
  editable,
  summary,
  layout,
  word,
}: {
  contents: LayoutComponent[];
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: WordCard;
}): JSX.Element {
  const theme = useTheme();
  return (
    <Typography variant="body1" sx={theme.body1}>
      <OtamaRecursion
        contents={contents}
        editable={editable}
        summary={summary}
        layout={layout}
        word={word}
      />
    </Typography>
  );
}

function OtamaBody2({
  contents,
  editable,
  summary,
  layout,
  word,
}: {
  contents: LayoutComponent[];
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: WordCard;
}): JSX.Element {
  const theme = useTheme();
  return (
    <Typography variant="body2" sx={theme.body2}>
      <OtamaRecursion
        contents={contents}
        editable={editable}
        summary={summary}
        layout={layout}
        word={word}
      />
    </Typography>
  );
}

function OtamaTextFeild({
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
        <TextField
          value={text}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
            setText(e.target.value);
          }}
          multiline
        />
      ) : (
        text
      )}
      <Button
        variant="text"
        onClick={() => {
          if (edit) {
            onChange(text);
          }
          setEdit(!edit);
        }}>
        {edit ? '確定' : '編集'}
      </Button>
    </>
  );
}

function OtamaString(
  props:
    | {
        text: string;
        editable: boolean;
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
  const theme = useTheme();
  const dispatch = useDispatch();
  const onSelectedWordPush = React.useCallback((mediator: Mediator) => {
    dispatch(pushSelectedWordAction(mediator));
  }, []);
  const { editable } = props;
  if ('text' in props) {
    const { text } = props;
    if (text)
      return (
        <Box component="span" sx={theme.string}>
          {text}
        </Box>
      );
  }
  if ('reference' in props) {
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
      <Box component="span" sx={theme.string}>
        {editable ? (
          <OtamaTextFeild
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
      </Box>
    );
  }
  api.log.error('reference and text is undifined.');
  return <></>;
}
OtamaString.defaultProps = {
  text: undefined,
  reference: undefined,
};

export default function CardRenderer({
  summary,
  word,
  layout,
}: Mediator): JSX.Element {
  const editable = useSelector<State, boolean>(
    (state: State) =>
      state.bookshelf.books.find(book => book.path === summary.bookPath)
        ?.editable ?? false,
  );
  return (
    <OtamaRecursion
      layout={layout}
      summary={summary}
      word={word}
      contents={
        layout.layout.component === 'recursion'
          ? layout.layout.contents
          : [layout.layout]
      }
      editable={editable}
    />
  );
}
