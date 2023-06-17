import TemplateProperties from 'otamashelf/TemplateProperties';

import SearchProperties from '../../common/SearchProperties';
import { Mediator } from '../Mediator';

import Book from './Book';

export default interface Workbench {
  book: Book;
  pageExplorer: SearchProperties;
  pageExplorers: SearchProperties[];
  searchMode: string;
  searchModes: string[];
  searchWord: string;
  templates: TemplateProperties[];
  mediators: Mediator[];
}
