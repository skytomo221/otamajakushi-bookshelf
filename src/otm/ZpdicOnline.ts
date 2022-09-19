import * as t from 'io-ts';

export type ZpdicOnline = {
  explanation: string;
  enableMarkdown: boolean;
};

export const TZpdicOnline = t.type({
  explanation: t.string,
  enableMarkdown: t.boolean,
});
