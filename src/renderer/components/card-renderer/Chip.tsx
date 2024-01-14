import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

import styleJoin from './styleJoin';

interface Props {
  className?: string;
  keyword: string;
  value: string | undefined;
}

export default function Chip({
  className,
  keyword,
  value,
}: Props): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return (
    <span className={styleJoin(theme.style.Chip, className)}>
      <span className={theme.style['Chip.Key']}>{keyword}</span>
      {value && <span className={theme.style['Chip.Value']}>{value}</span>}
    </span>
  );
}
Chip.defaultProps = {
  className: '',
};
