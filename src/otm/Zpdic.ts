import * as t from 'io-ts';

import { Word, TWord } from './Word';

export type Zpdic = {
  alphabetOrder?: string;
  plainInformationTitles?: null | string[];
  informationTitleOrder?: null | string[];
  defaultWord?: null | Word;
};

export const TZpdic = t.type({
  alphabetOrder: t.union([t.undefined, t.string]),
  plainInformationTitles: t.union([t.undefined, t.null, t.array(t.string)]),
  informationTitleOrder: t.union([t.undefined, t.null, t.array(t.string)]),
  defaultWord: t.union([t.undefined, t.null, TWord]),
});
