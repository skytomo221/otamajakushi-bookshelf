import { Chip, Typography } from '@material-ui/core';
import Relation from 'otamajakushi/dist/Relation';
import React from 'react';

interface Props {
  relation: Relation.Relation;
}

export default function Releation({ relation }: Props): JSX.Element {
  return (
    <Typography key={relation.entry.id} variant="body2">
      <Chip
        variant="outlined"
        size="small"
        label={relation.title}
//        className={classes.translationTitle}
        component="h3"
      />
      {relation.entry.form}
    </Typography>
  );
}
