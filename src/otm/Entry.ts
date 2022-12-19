import { JSONSchemaType } from 'ajv';
import * as t from 'io-ts';

export type Entry = {
  id: number;
  form: string;
}

export const entryScheme: JSONSchemaType<Entry> = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    form: {
      type: 'string',
    },
  },
  required: ['id', 'form'],
};
