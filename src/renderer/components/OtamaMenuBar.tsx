import React from 'react';

import Otamachan from '../../assets/otamachan.png';
import { useThemeStore } from '../contexts/themeContext';

import ControlBox from './ControlBox';
import FileMenu from './FileMenu';

export default function OtamaMenuBar(): JSX.Element {
  const theme = useThemeStore();

  return (
    <header
      className={`${theme.menuBar} flex h-8 [-webkit-app-region:drag]`}>
      <img src={Otamachan} className="m-1.5 h-5 w-5" alt="Otamachan" />
      <FileMenu />
      <div className="grow" />
      <h1 className="p-1.5 text-sm">Otamajakushi Bookshelf</h1>
      <div className="grow" />
      <ControlBox />
    </header>
  );
}
