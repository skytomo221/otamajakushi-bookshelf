import React, { useContext } from 'react';

import { useThemeStore } from '../../contexts/themeContext';

import { PageRendererContext } from './PageRendererContext';
import styleJoin from './styleJoin';

interface Props {
  keyword: string;
  value: string | undefined;
}

export default function Chip({
  keyword,
  value,
}: Props): JSX.Element {
  const theme = useThemeStore();
  const { className } = useContext(PageRendererContext);
  return (
    <span className={styleJoin(theme.Chip, className)}>
      <span className={theme['Chip.Key']}>{keyword}</span>
      {value && <span className={theme['Chip.Value']}>{value}</span>}
    </span>
  );
}
