import { PageExplorerProperties } from '../common/ExtensionProperties';
import PageExplorer from '../common/PageExplorer';
import { SearchCard } from '../common/SearchCard';

export default class EndsWithPageExplorer extends PageExplorer {
  public readonly properties = async (): Promise<PageExplorerProperties> => ({
    name: 'EndsWithPageExplorer',
    id: 'ends-with-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  });

  public readonly name = async (): Promise<string> => '語末一致';

  public readonly search = async (
    cards: SearchCard[],
    searchWord: string,
  ): Promise<string[]> =>
    cards
      .filter(card => card.targets.some(t => t.endsWith(searchWord)))
      .map(card => card.id);
}
