import { JSONSchemaType } from 'ajv';

export type ZpdicOnline = {
  explanation: string;
  enableMarkdown: boolean;
};

export const zpdicOnlineScheme: JSONSchemaType<ZpdicOnline> = {
  type: 'object',
  properties: {
    explanation: {
      type: 'string',
    },
    enableMarkdown: {
      type: 'boolean',
    },
  },
  required: ['explanation', 'enableMarkdown'],
};
