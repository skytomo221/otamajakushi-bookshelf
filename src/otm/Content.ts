import { JSONSchemaType } from 'ajv';

export type Content = {
  title: string;
  text: string;
  markdown?: string;
};

export const contentScheme: JSONSchemaType<Content> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    text: {
      type: 'string',
    },
    markdown: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['title', 'text'],
};
