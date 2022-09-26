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
          case 'form':
            return <OtamaForm form={child.form} />;
          case 'title':
            return <OtamaTitle title={child.title} />;
          case 'text':
            return <OtamaText text={child.text} />;
          default:
            return <></>;
        }
      })}
    </>
  );
}

function OtamaForm({ form }: { form: string }): JSX.Element {
  return (
    <Typography variant="h5" component="h2">
      {form}
    </Typography>
  );
}

function OtamaTitle({ title }: { title: string }): JSX.Element {
  return (
    <Typography variant="h6" component="h3">
      {title}
    </Typography>
  );
}

function OtamaText({ text }: { text: string }): JSX.Element {
  return <Typography variant="body2">{text}</Typography>;
}

export default function WordCard({ card }: Props): JSX.Element {
  switch (card.layout.component) {
    case 'recursion':
      return <OtamaRecursion contents={card.layout.contents} />;
    case 'form':
      return <OtamaForm form={card.layout.form} />;
    case 'title':
      return <OtamaTitle title={card.layout.title} />;
    case 'text':
      return <OtamaText text={card.layout.text} />;
    default:
      return <></>;
  }
}
