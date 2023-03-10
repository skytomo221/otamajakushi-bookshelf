import { JSONSchemaType } from 'ajv';

import { Entry, entryScheme } from './Entry';

export type Relation = {
  title: string;
  entry: Entry;
};

export const relationScheme: JSONSchemaType<Relation> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    entry: entryScheme,
  },
  required: ['title', 'entry'],
};
