import { PageExplorerProperties } from '../common/ExtensionProperties';
import PageExplorer from '../common/PageExplorer';
import { SearchCard } from '../common/SearchCard';

export default class RegexPageExplorer extends PageExplorer {
  public readonly properties: PageExplorerProperties = {
    name: 'RegexPageExplorer',
    id: 'regex-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  };

  public readonly name = (): string => '正規表現';

  public readonly search = (
    cards: SearchCard[],
    searchWord: string,
  ): string[] =>
    cards
      .filter(card => card.targets.some(t => t.match(searchWord)))
      .map(card => card.id);
}
