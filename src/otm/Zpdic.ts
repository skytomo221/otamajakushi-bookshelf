import { JSONSchemaType } from 'ajv';

import { Word, wordScheme } from './Word';

export type Zpdic = {
  alphabetOrder?: string;
  plainInformationTitles?: null | string[];
  informationTitleOrder?: null | string[];
  defaultWord?: null | Word;
};

export const zpdicScheme: JSONSchemaType<Zpdic> = {
  type: 'object',
  properties: {
    alphabetOrder: {
      type: 'string',
      nullable: true,
    },
    plainInformationTitles: {
      type: 'array',
      items: {
        type: 'string',
      },
      nullable: true,
    },
    informationTitleOrder: {
      type: 'array',
      items: {
        type: 'string',
      },
      nullable: true,
    },
    defaultWord: {
      ...wordScheme,
      nullable: true,
    },
  },
  required: [],
};
