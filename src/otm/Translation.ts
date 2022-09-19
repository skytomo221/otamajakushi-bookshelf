import * as t from 'io-ts';

export type Translation = {
  title: string;
  forms: string[];
}

export const TTranslation = t.type({
  title: t.string,
  forms: t.array(t.string),
});
