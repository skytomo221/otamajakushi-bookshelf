import * as t from 'io-ts';

import { Content, TContent } from './Content';
import { Entry, TEntry } from './Entry';
import { Relation, TRelation } from './Relation';
import { Translation, TTranslation } from './Translation';
import { Variation, TVariation } from './Variation';

export type Word = {
  entry: Entry;
  translations: Translation[];
  tags: string[];
  contents: Content[];
  variations: Variation[];
  relations: Relation[];
};

export const TWord = t.type({
  entry: TEntry,
  translations: t.array(TTranslation),
  tags: t.array(t.string),
  contents: t.array(TContent),
  variations: t.array(TVariation),
  relations: t.array(TRelation),
});
