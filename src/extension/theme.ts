import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { Extension } from './extension';

export interface ThemeExtension extends Extension {
  styles: (
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
