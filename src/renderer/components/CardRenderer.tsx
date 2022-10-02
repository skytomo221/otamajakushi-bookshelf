import {
  Box,
  Chip,
  Divider,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { Content } from 'otamajakushi/dist/Content';
import { Relation } from 'otamajakushi/dist/Relation';
import { Translation } from 'otamajakushi/dist/Translation';
import { Variation } from 'otamajakushi/dist/Variation';
import { Word } from 'otamajakushi/dist/Word';
import React from 'react';
import { useSelector } from 'react-redux';

import { LayoutCard, LayoutComponent } from '../LayoutCard';
import { State } from '../states/State';

const { api } = window;

interface Props {
  card: LayoutCard;
}

function OtamaRecursion({
  contents,
  editable,
}: {
  contents: LayoutComponent[];
  editable: boolean;
}): JSX.Element {
  return (
    <>
      {contents.map(child => {
        switch (child.component) {
          case 'recursion':
            return (
              <OtamaRecursion contents={child.contents} editable={editable} />
            );
          case 'chip':
            return <OtamaChip label={child.label} editable={editable} />;
          case 'form':
            return <OtamaForm contents={child.contents} editable={editable} />;
          case 'title':
            return <OtamaTitle contents={child.contents} editable={editable} />;
          case 'body1':
            return <OtamaBody1 contents={child.contents} editable={editable} />;
          case 'body2':
            return <OtamaBody2 contents={child.contents} editable={editable} />;
          case 'string':
            return <OtamaString text={child.text} editable={editable} />;
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
}: {
  label: string;
  editable: boolean;
}): JSX.Element {
  const theme = useTheme();
  return <Chip variant="outlined" size="small" sx={theme.chip} label={label} />;
}

function OtamaForm({
  contents,
  editable,
}: {
  contents: LayoutComponent[];
  editable: boolean;
}): JSX.Element {
  return (
    <Typography variant="h2">
      <OtamaRecursion contents={contents} editable={editable} />
    </Typography>
  );
}

function OtamaTitle({
  contents,
  editable,
}: {
  contents: LayoutComponent[];
  editable: boolean;
}): JSX.Element {
  return (
    <Typography variant="h3">
      <OtamaRecursion contents={contents} editable={editable} />
    </Typography>
  );
}

function OtamaBody1({
  contents,
  editable,
}: {
  contents: LayoutComponent[];
  editable: boolean;
}): JSX.Element {
  const theme = useTheme();
  return (
    <Typography variant="body1" sx={theme.body1}>
      <OtamaRecursion contents={contents} editable={editable} />
    </Typography>
  );
}

function OtamaBody2({
  contents,
  editable,
}: {
  contents: LayoutComponent[];
  editable: boolean;
}): JSX.Element {
  const theme = useTheme();
  return (
    <Typography variant="body2" sx={theme.body2}>
      <OtamaRecursion contents={contents} editable={editable} />
    </Typography>
  );
}

function OtamaString({
  text,
  editable,
}: {
  text: string;
  editable: boolean;
}): JSX.Element {
  const theme = useTheme();
  return (
    <Box component="span" sx={theme.string}>
      {editable ? <TextField value={text} multiline /> : text}
    </Box>
  );
}

export default function CardRenderer({ card }: Props): JSX.Element {
  const editable = useSelector<State, boolean>(
    (state: State) =>
      state.bookshelf.books.find(book => book.path === card.word.bookPath)
        ?.editable ?? false,
  );
  return (
    <OtamaRecursion
      contents={
        card.layout.component === 'recursion'
          ? card.layout.contents
          : [card.layout]
      }
      editable={editable}
    />
  );
}
