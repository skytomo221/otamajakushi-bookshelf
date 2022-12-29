import Extension from './Extension';
import { PageExplorerProperties } from './ExtensionProperties';
import { SearchCard } from './SearchCard';

export default abstract class PageExplorer extends Extension {
  public abstract readonly properties: PageExplorerProperties;

  abstract readonly name: () => string;

  abstract readonly search: (
    cards: SearchCard[],
    searchWord: string,
  ) => string[];
}
