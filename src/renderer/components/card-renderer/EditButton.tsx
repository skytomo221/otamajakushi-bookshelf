import React from 'react';

import { useThemeStore } from '../../contexts/themeContext';

import styleJoin from './styleJoin';

interface Props {
  className?: string;
  edit: () => void;
  editable: boolean;
}

export default function EditButton({
  className,
  edit,
  editable,
}: Props): JSX.Element {
  const theme = useThemeStore();
  return editable ? (
    <button
      aria-label="Save"
      className={styleJoin(theme.EditButton, className)}
      onClick={edit}
      type="submit">
      編集する
    </button>
  ) : (
    <></>
  );
}
EditButton.defaultProps = {
  className: '',
};
