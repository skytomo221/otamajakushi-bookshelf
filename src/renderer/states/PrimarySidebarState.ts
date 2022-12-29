import SearchProperties from '../../common/SearchProperties';
import TemplateProperties from '../../common/TemplateProperties';
import { Mediator } from '../Mediator';

import Book from './Book';

export default interface PrimarySidebarStates {
  book: Book;
  pageExplorer: SearchProperties;
  pageExplorers: SearchProperties[];
  searchMode: string;
  searchModes: string[];
  searchWord: string;
  templates: TemplateProperties[];
  mediators: Mediator[];
}
