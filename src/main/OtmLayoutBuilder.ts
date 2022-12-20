import Ajv from 'ajv';

import { LayoutBuilderProperties } from '../common/ExtensionProperties';
import LayoutBuilder from '../common/LayoutBuilder';
import {
  LayoutCard,
  Chip,
  LayoutComponent,
  Plain,
  P,
} from '../common/LayoutCard';
import { PageCard } from '../common/PageCard';
import { Translation } from '../otm/Translation';
import { wordScheme } from '../otm/Word';

export default class OtmLayoutBuilder extends LayoutBuilder {
  public properties: LayoutBuilderProperties = {
    name: 'OTM Layout Builder',
    id: 'otm-layout-builder',
    version: '0.1.0',
    type: 'layout-builder',
    author: 'skytomo221',
  };

  public readonly layout = (word: PageCard): LayoutCard => {
    const ajv = new Ajv();
    const valid = ajv.validate(wordScheme, word);
    if (!valid) {
      throw new Error(ajv.errorsText());
    }
    const rawContents = {
      baseReference: 'contents',
      component: 'draggable-array',
      content: {
        component: 'recursion',
        contents: [
          {
            component: 'h3',
            contents: [
              {
                component: 'text/plain',
                reference: `.title`,
              } as LayoutComponent,
            ],
          },
          {
            component: 'p',
            contents: [
              {
                component: 'text/markdown',
                reference: `.text`,
              } as LayoutComponent,
            ],
          },
        ],
      },
    } as LayoutComponent;
    const contents: LayoutComponent[] = [
      rawContents,
      {
        component: 'div',
        contents: [
          {
            component: 'button',
            onClick: 'contents/add',
            contents: [
              {
                component: 'text/plain',
                text: '新しくコンテンツを追加する',
              },
            ],
          },
        ],
      },
    ];
    const translations = (word.translations ?? []).map(
      (translation: Translation, index: number): P => ({
        component: 'p',
        contents: [
          {
            component: 'span',
            contents: [
              {
                component: 'chip',
                key: {
                  component: 'text/plain',
                  text: translation.title,
                },
              },
              ...translation.forms.map(
                (_, twIndex): Plain => ({
                  component: 'text/plain',
                  reference: `translations.${index}.forms.${twIndex}`,
                }),
              ),
            ],
          },
        ],
      }),
    );
    return {
      layout: {
        component: 'recursion',
        contents: [
          {
            component: 'h2',
            contents: [
              {
                component: 'text/plain',
                reference: 'entry.form',
              },
              ...(word.tags ?? []).map(
                (tag): Chip => ({
                  component: 'chip',
                  key: { component: 'text/plain', text: tag },
                }),
              ),
            ],
          },
          ...translations,
          ...contents,
        ],
      },
    };
  };
}
