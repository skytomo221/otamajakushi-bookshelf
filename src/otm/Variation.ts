import * as t from 'io-ts';

export type Variation = {
  title: string;
  form: string;
}

export const TVariation = t.type({
  title: t.string,
  form: t.string,
});
