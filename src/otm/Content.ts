import * as t from 'io-ts';

export type Content = {
  title: string;
  text: string;
  markdown?: string;
};

export const TContent = t.type({
  title: t.string,
  text: t.string,
  markdown: t.union([t.undefined, t.string]),
});
