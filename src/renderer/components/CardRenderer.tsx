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
import { pushSelectedWordAction } from '../actions/SelectedWordsActions';
import { State } from '../states/State';

const { api } = window;

interface Props {
  card: LayoutCard;
}

function OtamaRecursion({
  contents,
  editable,
  card,
}: {
  contents: LayoutComponent[];
  editable: boolean;
  card: LayoutCard;
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
                card={card}
              />
            );
          case 'chip':
            return (
              <OtamaChip label={child.label} editable={editable} card={card} />
            );
          case 'form':
            return (
              <OtamaForm
                contents={child.contents}
                editable={editable}
                card={card}
              />
            );
          case 'title':
            return (
              <OtamaTitle
                contents={child.contents}
                editable={editable}
                card={card}
              />
            );
          case 'body1':
            return (
              <OtamaBody1
                contents={child.contents}
                editable={editable}
                card={card}
              />
            );
          case 'body2':
            return (
              <OtamaBody2
                contents={child.contents}
                editable={editable}
                card={card}
              />
            );
          case 'string':
            return 'text' in child ? (
              <OtamaString text={child.text} editable={editable} card={card} />
            ) : (
              <OtamaString
                reference={child.reference}
                editable={editable}
                card={card}
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
  card,
}: {
  label: string;
  editable: boolean;
  card: LayoutCard;
}): JSX.Element {
  const theme = useTheme();
  return <Chip variant="outlined" size="small" sx={theme.chip} label={label} />;
}

function OtamaForm({
  contents,
  editable,
  card,
}: {
  contents: LayoutComponent[];
  editable: boolean;
  card: LayoutCard;
}): JSX.Element {
  return (
    <Typography variant="h2">
      <OtamaRecursion contents={contents} editable={editable} card={card} />
    </Typography>
  );
}

function OtamaTitle({
  contents,
  editable,
  card,
}: {
  contents: LayoutComponent[];
  editable: boolean;
  card: LayoutCard;
}): JSX.Element {
  return (
    <Typography variant="h3">
      <OtamaRecursion contents={contents} editable={editable} card={card} />
    </Typography>
  );
}

function OtamaBody1({
  contents,
  editable,
  card,
}: {
  contents: LayoutComponent[];
  editable: boolean;
  card: LayoutCard;
}): JSX.Element {
  const theme = useTheme();
  return (
    <Typography variant="body1" sx={theme.body1}>
      <OtamaRecursion contents={contents} editable={editable} card={card} />
    </Typography>
  );
}

function OtamaBody2({
  contents,
  editable,
  card,
}: {
  contents: LayoutComponent[];
  editable: boolean;
  card: LayoutCard;
}): JSX.Element {
  const theme = useTheme();
  return (
    <Typography variant="body2" sx={theme.body2}>
      <OtamaRecursion contents={contents} editable={editable} card={card} />
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
        card: LayoutCard;
      }
    | {
        reference: string;
        editable: boolean;
        card: LayoutCard;
      },
): JSX.Element {
  const theme = useTheme();
  const dispatch = useDispatch();
  const onSelectedWordPush = React.useCallback((selectedWord: LayoutCard) => {
    dispatch(pushSelectedWordAction(selectedWord));
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
    const { reference, card } = props;
    const flattenCard = flatten(card.word) as { [key: string]: string };
    if (typeof flattenCard !== 'object') {
      api.log.error('Layout card is invalid.', card, flattenCard);
      return <></>;
    }
    if (!flattenCard) {
      api.log.error('Layout card is null.', card, flattenCard);
      return <></>;
    }
    if (!(reference in flattenCard)) {
      api.log.error('Reference is null.', card, flattenCard, reference);
      return <></>;
    }
    if (
      reference in flattenCard &&
      typeof flattenCard[reference] !== 'string'
    ) {
      api.log.error(
        'Reference is not string.',
        card,
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
                ...card,
                word: unflatten({
                  // eslint-disable-next-line @typescript-eslint/ban-types
                  ...(flatten(card.word) as object),
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

export default function CardRenderer({ card }: Props): JSX.Element {
  const editable = useSelector<State, boolean>(
    (state: State) =>
      state.bookshelf.books.find(book => book.path === card.summary.bookPath)
        ?.editable ?? false,
  );
  return (
    <OtamaRecursion
      card={card}
      contents={
        card.layout.component === 'recursion'
          ? card.layout.contents
          : [card.layout]
      }
      editable={editable}
    />
  );
}
