import { PageExplorerProperties } from '../common/ExtensionProperties';
import PageExplorer from '../common/PageExplorer';
import { SearchCard } from '../common/SearchCard';

export default class EndsWithPageExplorer extends PageExplorer {
  public readonly properties: PageExplorerProperties = {
    name: 'EndsWithPageExplorer',
    id: 'ends-with-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  };

  public readonly name = (): string => '語末一致';

  public readonly search = (
    cards: SearchCard[],
    searchWord: string,
  ): string[] =>
    cards
      .filter(card => card.targets.some(t => t.endsWith(searchWord)))
      .map(card => card.id);
}
