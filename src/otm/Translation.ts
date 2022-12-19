import { JSONSchemaType } from 'ajv';

export type Translation = {
  title: string;
  forms: string[];
}

export const translationScheme: JSONSchemaType<Translation> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    forms: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['title', 'forms'],
};
