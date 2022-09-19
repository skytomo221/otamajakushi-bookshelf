import * as t from 'io-ts';

import { Entry, TEntry } from './Entry';

export type Relation = {
  title: string;
  entry: Entry;
};

export const TRelation = t.type({
  title: t.string,
  entry: TEntry,
});
