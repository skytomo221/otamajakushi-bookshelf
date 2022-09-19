import * as t from 'io-ts';

export type Entry = {
  id: number;
  form: string;
}

export const TEntry = t.type({
  id: t.number,
  form: t.string,
});
