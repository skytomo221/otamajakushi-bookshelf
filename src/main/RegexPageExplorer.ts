import { PageExplorerProperties } from 'otamashelf';
import PageExplorer, {
  NameReturns,
  SearchProps,
  SearchReturns,
} from 'otamashelf/PageExplorer';

export default class RegexPageExplorer extends PageExplorer {
  readonly properties: PageExplorerProperties = {
    action: 'properties',
    name: 'Regex Page Explorer',
    id: 'regex-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  };

  // eslint-disable-next-line class-methods-use-this
  async name(): Promise<NameReturns> {
    return {
      action: 'name',
      name: '正規表現',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  async search({ cards, searchWord }: SearchProps): Promise<SearchReturns> {
    const ids = cards
      .filter(card => card.targets.some(t => t.match(searchWord)))
      .map(card => card.id);
    return {
      action: 'search',
      status: 'resolve',
      returns: {
        ids,
      },
    };
  }
}
