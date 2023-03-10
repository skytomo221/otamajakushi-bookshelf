import Extension from './Extension';
import { PageExplorerProperties } from './ExtensionProperties';
import { SearchCard } from './SearchCard';

export default abstract class PageExplorer extends Extension {
  abstract properties(): Promise<PageExplorerProperties>;

  abstract readonly name: () => Promise<string>;

  abstract readonly search: (
    cards: SearchCard[],
    searchWord: string,
  ) => Promise<string[]>;
}
