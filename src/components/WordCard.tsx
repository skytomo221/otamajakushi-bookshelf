import {
  Card,
  CardContent,
  Chip,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { Translation } from 'otamajakushi/dist/Translation';
import { Word } from 'otamajakushi/dist/Word';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexWrap: 'wrap',
      margin: theme.spacing(1.5),
      '& > *': {
        margin: theme.spacing(0.25),
      },
    },
    translationTitle: {
      margin: theme.spacing(0.25),
    },
  }),
);

interface Props {
  word: Word;
  className: string;
}

export default function WordCard(props: Props): JSX.Element {
  const { word, className } = props;
  const classes = useStyles();
  return (
    <Card className={className}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {word.entry.form}
          <span className={classes.root}>
            {word.tags.map((tag: string) => (
              <Chip size="small" label={tag} key={tag} />
            ))}
          </span>
        </Typography>
        {word.translations.map((translation: Translation) => (
          <>
            <Typography variant="body2">
              <Chip
                variant="outlined"
                size="small"
                label={translation.title}
                className={classes.translationTitle}
              />
              {translation.forms.join(', ')}
            </Typography>
          </>
        ))}
      </CardContent>
    </Card>
  );
}
