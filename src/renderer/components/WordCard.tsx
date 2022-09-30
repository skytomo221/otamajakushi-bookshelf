import { Box, Chip, Divider, Theme, Typography } from '@mui/material';
import { Content } from 'otamajakushi/dist/Content';
import { Relation } from 'otamajakushi/dist/Relation';
import { Translation } from 'otamajakushi/dist/Translation';
import { Variation } from 'otamajakushi/dist/Variation';
import { Word } from 'otamajakushi/dist/Word';
import React from 'react';
import { LayoutCard, LayoutComponent } from '../LayoutCard';

const { api } = window;

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexWrap: 'wrap',
//       margin: theme.spacing(1.5),
//       '& > *': {
//         margin: theme.spacing(0.25),
//       },
//     },
//     translationTitle: {
//       margin: theme.spacing(0.25),
//     },
//     content: {
//       margin: theme.spacing(0.75),
//       '&:last-child': {
//         marginBottom: theme.spacing(0),
//       },
//     },
//     divider: {
//       margin: theme.spacing(0.5),
//     },
//   }),
// );

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
          case 'text':
            return <OtamaText contents={child.contents} />;
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
  return <Chip variant="outlined" size="small" label={label} component="h3" />;
}

function OtamaForm({ contents }: { contents: LayoutComponent[] }): JSX.Element {
  return (
    <Typography variant="h5" component="h2">
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
    <Typography variant="h6" component="h3">
      <OtamaRecursion contents={contents} />
    </Typography>
  );
}

function OtamaText({ contents }: { contents: LayoutComponent[] }): JSX.Element {
  return (
    <Typography variant="body2">
      <OtamaRecursion contents={contents} />
    </Typography>
  );
}

function OtamaString({ text }: { text: string }): JSX.Element {
  return <span>{text}</span>;
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
