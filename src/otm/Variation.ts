import { JSONSchemaType } from 'ajv';

export type Variation = {
  title: string;
  form: string;
}

export const variationScheme: JSONSchemaType<Variation> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    form: {
      type: 'string',
    },
  },
  required: ['title', 'form'],
};
