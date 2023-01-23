import { PageExplorerProperties } from '../common/ExtensionProperties';
import PageExplorer from '../common/PageExplorer';
import { SearchCard } from '../common/SearchCard';

export default class AllPageExplorer extends PageExplorer {
  public readonly properties = async (): Promise<PageExplorerProperties> => ({
    name: 'IncludesPageExplorer',
    id: 'includes-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  });

  public readonly name = async (): Promise<string> => '部分一致';

  public readonly search = async (cards: SearchCard[]): Promise<string[]> =>
    cards.map(card => card.id);
}
