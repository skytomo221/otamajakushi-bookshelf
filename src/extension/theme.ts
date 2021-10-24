import { ClassNameMap } from '@material-ui/core/styles/withStyles';

import { Extension } from './extension';

export interface ThemeExtension extends Extension {
  useStyles: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props?: any,
  ) => ClassNameMap<
    | 'appBar'
    | 'grow'
    | 'menuIconButton'
    | 'iconButton'
    | 'title'
    | 'search'
    | 'searchIcon'
    | 'inputRoot'
    | 'inputInput'
    | 'sectionDesktop'
    | 'scrollTop'
  >;
}
