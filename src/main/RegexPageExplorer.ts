import { ConfigurationPage } from 'otamashelf/Page';
import {
  PageExplorer,
  NameReturns,
  SearchProps,
  SearchReturns,
} from 'otamashelf/PageExplorer';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: 'simple-configuration-format-v1',
  data: {},
};

function isMatch(matchWithIndex: {
  match: RegExpMatchArray | null;
  targetIndex: number;
}): matchWithIndex is { match: RegExpMatchArray; targetIndex: number } {
  return matchWithIndex.match !== null;
}

const regexPageExplorer: PageExplorer = {
  properties: {
    name: 'Regex Page Explorer',
    id: '@skytomo221/regex-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  },
  configuration() {
    return { configuration };
  },
  name(): Promise<NameReturns> {
    return Promise.resolve({ name: '正規表現' });
  },
  search({ searchCards, searchWord }: SearchProps): Promise<SearchReturns> {
    return Promise.resolve({
      results: searchCards
        .map(card => {
          const { id, targets } = card;
          const matches = targets
            .map((target, targetIndex) => ({
              match: target.match(searchWord),
              targetIndex,
            }))
            .filter(isMatch)
            .map(({ match, targetIndex }) => {
              const begin = match.index ?? 0;
              const end = begin + match[0].length;
              return { targetIndex, begin, end };
            });
          return { id, matches };
        })
        .filter(({ matches }) => matches.length > 0),
    });
  },
};

export default regexPageExplorer;
