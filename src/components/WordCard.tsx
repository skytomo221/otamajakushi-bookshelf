import {
  Box,
  Chip,
  createStyles,
  Divider,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { Content } from 'otamajakushi/dist/Content';
import { Relation } from 'otamajakushi/dist/Relation';
import { Translation } from 'otamajakushi/dist/Translation';
import { Variation } from 'otamajakushi/dist/Variation';
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
    content: {
      margin: theme.spacing(0.75),
      '&:last-child': {
        marginBottom: theme.spacing(0),
      },
    },
    divider: {
      margin: theme.spacing(0.5),
    },
  }),
);

interface Props {
  word: Word;
}

export default function WordCard({ word }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5" component="h2">
        {word.entry.form}
        <span className={classes.root}>
          {word.tags.map((tag: string) => (
            <Chip size="small" label={tag} key={tag} />
          ))}
        </span>
      </Typography>
      {word.translations.map((translation: Translation) => (
        <Typography key={translation.title + translation.forms} variant="body2">
          <Chip
            variant="outlined"
            size="small"
            label={translation.title}
            className={classes.translationTitle}
            component="h3"
          />
          {translation.forms.join(', ')}
        </Typography>
      ))}
      {word.contents.length > 0 ? <Divider className={classes.divider} /> : ''}
      {word.contents.map((content: Content) => (
        <Box key={content.title} className={classes.content}>
          <Typography variant="h6" component="h3">
            {content.title}
          </Typography>
          <Typography variant="body2">{content.text}</Typography>
        </Box>
      ))}
      {word.variations.length > 0 ? (
        <>
          <Divider className={classes.divider} />
          <Box className={classes.content}>
            <Typography variant="h6" component="h3">
              変化形
            </Typography>
            {word.variations.map((variation: Variation) => (
              <Typography key={variation.form} variant="body2">
                <Chip
                  variant="outlined"
                  size="small"
                  label={variation.title}
                  className={classes.translationTitle}
                  component="h3"
                />
                {variation.form}
              </Typography>
            ))}
          </Box>
        </>
      ) : (
        ''
      )}
      {word.relations.length > 0 ? (
        <>
          <Divider className={classes.divider} />
          <Box className={classes.content}>
            <Typography variant="h6" component="h3">
              関連項目
            </Typography>
            {word.relations.map((relation: Relation) => (
              <Typography key={relation.entry.id} variant="body2">
                <Chip
                  variant="outlined"
                  size="small"
                  label={relation.title}
                  className={classes.translationTitle}
                  component="h3"
                />
                {relation.entry.form}
              </Typography>
            ))}
          </Box>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
