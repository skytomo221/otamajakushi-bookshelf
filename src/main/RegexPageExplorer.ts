import { PageExplorerProperties } from '../common/ExtensionProperties';
import PageExplorer from '../common/PageExplorer';
import { SearchCard } from '../common/SearchCard';

export default class RegexPageExplorer extends PageExplorer {
  public readonly properties = async (): Promise<PageExplorerProperties> => ({
    name: 'RegexPageExplorer',
    id: 'regex-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  });

  public readonly name = async (): Promise<string> => '正規表現';

  public readonly search = async (
    cards: SearchCard[],
    searchWord: string,
  ): Promise<string[]> =>
    cards
      .filter(card => card.targets.some(t => t.match(searchWord)))
      .map(card => card.id);
}
