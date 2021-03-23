import { TextField } from '@material-ui/core';
import React, { useCallback } from 'react';

interface Props {
  onChangeText: (value: string) => void;
}

export default function SearchWordTextField(props: Props): JSX.Element {
  const { onChangeText } = props;
  const onValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      onChangeText(value);
    },
    [onChangeText],
  );
  return <TextField label="検索" onChange={onValueChange} fullWidth />;
}
