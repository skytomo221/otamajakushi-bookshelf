import { JSONSchemaType } from 'ajv';

import { Content, contentScheme } from './Content';
import { Entry, entryScheme } from './Entry';
import { Relation, relationScheme } from './Relation';
import { Translation, translationScheme } from './Translation';
import { Variation, variationScheme } from './Variation';

export type Word = {
  entry: Entry;
  translations: Translation[];
  tags: string[];
  contents: Content[];
  variations: Variation[];
  relations: Relation[];
};

export const wordScheme: JSONSchemaType<Word> = {
  type: 'object',
  properties: {
    entry: entryScheme,
    translations: {
      type: 'array',
      items: translationScheme,
    },
    tags: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    contents: {
      type: 'array',
      items: contentScheme,
    },
    variations: {
      type: 'array',
      items: variationScheme,
    },
    relations: {
      type: 'array',
      items: relationScheme,
    },
  },
  required: [
    'entry',
    'translations',
    'tags',
    'contents',
    'variations',
    'relations',
  ],
};
