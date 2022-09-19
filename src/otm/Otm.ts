import * as t from 'io-ts';

import { Word, TWord } from './Word';
import { Zpdic, TZpdic } from './Zpdic';
import { ZpdicOnline, TZpdicOnline } from './ZpdicOnline';

export type Otm = {
  words: Word[];
  version?: number;
  zpdic?: Zpdic;
  zpdicOnline?: ZpdicOnline;
};

export const TOtm = t.type({
  words: t.array(TWord),
  version: t.union([t.undefined, t.number]),
  zpdic: t.union([t.undefined, TZpdic]),
  zpdicOnline: t.union([t.undefined, TZpdicOnline]),
});
