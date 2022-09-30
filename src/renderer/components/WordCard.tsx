import { Box, Chip, Divider, Theme, Typography, useTheme } from '@mui/material';
import { Content } from 'otamajakushi/dist/Content';
import { Relation } from 'otamajakushi/dist/Relation';
import { Translation } from 'otamajakushi/dist/Translation';
import { Variation } from 'otamajakushi/dist/Variation';
import { Word } from 'otamajakushi/dist/Word';
import React from 'react';

import { LayoutCard, LayoutComponent } from '../LayoutCard';

const { api } = window;

interface Props {
  card: LayoutCard;
}

function OtamaRecursion({
  contents,
}: {
  contents: LayoutComponent[];
}): JSX.Element {
  return (
    <>
      {contents.map(child => {
        switch (child.component) {
          case 'recursion':
            return <OtamaRecursion contents={child.contents} />;
          case 'chip':
            return <OtamaChip label={child.label} />;
          case 'form':
            return <OtamaForm contents={child.contents} />;
          case 'title':
            return <OtamaTitle contents={child.contents} />;
          case 'body1':
            return <OtamaBody1 contents={child.contents} />;
          case 'body2':
            return <OtamaBody2 contents={child.contents} />;
          case 'string':
            return <OtamaString text={child.text} />;
          default:
            return <></>;
        }
      })}
    </>
  );
}

function OtamaChip({ label }: { label: string }): JSX.Element {
  const theme = useTheme();
  return <Chip variant="outlined" size="small" sx={theme.chip} label={label} />;
}

function OtamaForm({ contents }: { contents: LayoutComponent[] }): JSX.Element {
  return (
    <Typography variant="h2">
      <OtamaRecursion contents={contents} />
    </Typography>
  );
}

function OtamaTitle({
  contents,
}: {
  contents: LayoutComponent[];
}): JSX.Element {
  return (
    <Typography variant="h3">
      <OtamaRecursion contents={contents} />
    </Typography>
  );
}

function OtamaBody1({
  contents,
}: {
  contents: LayoutComponent[];
}): JSX.Element {
  const theme = useTheme();
  return (
    <Typography variant="body1" sx={theme.body1}>
      <OtamaRecursion contents={contents} />
    </Typography>
  );
}

function OtamaBody2({
  contents,
}: {
  contents: LayoutComponent[];
}): JSX.Element {
  const theme = useTheme();
  return (
    <Typography variant="body2" sx={theme.body2}>
      <OtamaRecursion contents={contents} />
    </Typography>
  );
}

function OtamaString({ text }: { text: string }): JSX.Element {
  const theme = useTheme();
  return (
    <Box component="span" sx={theme.string}>
      {text}
    </Box>
  );
}

export default function WordCard({ card }: Props): JSX.Element {
  return (
    <OtamaRecursion
      contents={
        card.layout.component === 'recursion'
          ? card.layout.contents
          : [card.layout]
      }
    />
  );
}
