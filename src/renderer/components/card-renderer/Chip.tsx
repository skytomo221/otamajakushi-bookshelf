import React from 'react';

import { useThemeStore } from '../../contexts/themeContext';

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
  const theme = useThemeStore();
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
