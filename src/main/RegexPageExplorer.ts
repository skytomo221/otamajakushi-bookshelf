import { PageExplorerProperties } from 'otamashelf';
import PageExplorer, {
  SearchProps,
  SearchReturns,
} from 'otamashelf/PageExplorer';

export default class RegexPageExplorer extends PageExplorer {
  readonly properties: PageExplorerProperties = {
    name: 'Regex Page Explorer',
    id: 'regex-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  };

  name = async (): Promise<string> => '正規表現';

  readonly search = ({
    cards,
    searchWord,
  }: SearchProps): Promise<SearchReturns> =>
    new Promise(resolve => {
      const ids = cards
        .filter(card => card.targets.some(t => t.match(searchWord)))
        .map(card => card.id);
      resolve({
        name: 'search',
        status: 'resolve',
        returns: {
          ids,
        },
      });
    });
}
