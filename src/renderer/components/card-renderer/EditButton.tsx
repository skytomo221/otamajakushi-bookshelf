import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

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
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return editable ? (
    <button
      aria-label="Save"
      className={styleJoin(theme.style.EditButton, className)}
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
