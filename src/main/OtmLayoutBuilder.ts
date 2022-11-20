import { LayoutBuilderProperties } from '../common/ExtensionProperties';
import LayoutBuilder from '../common/LayoutBuilder';
import {
  LayoutCard,
  Chip,
  LayoutComponent,
  Recursion,
  Plain,
} from '../common/LayoutCard';
import { WordCard, Content, Translation } from '../common/WordCard';

export default class OtmLayoutBuilder extends LayoutBuilder {
  public properties: LayoutBuilderProperties = {
    name: 'OTM Layout Builder',
    id: 'otm-layout-builder',
    version: '0.1.0',
    type: 'layout-builder',
    author: 'skytomo221',
  };

  public readonly layout = (word: WordCard): LayoutCard => {
    const contents = (word.contents ?? []).map(
      (content: Content, index: number): Recursion => ({
        component: 'recursion',
        contents: [
          {
            component: 'h3',
            contents: [
              {
                component: 'text/plain',
                text: content.title,
              } as LayoutComponent,
            ],
          },
          {
            component: 'span',
            class: 'text-base',
            contents: [
              {
                component:
                  content.type === 'text/markdown'
                    ? 'text/markdown'
                    : 'text/plain',
                reference: `contents.${index}.description`,
              } as LayoutComponent,
            ],
          },
        ],
      }),
    );
    const translations = (word.translations ?? []).map(
      (translation: Translation, index: number): Recursion => ({
        component: 'recursion',
        contents: [
          {
            component: 'span',
            contents: [
              {
                component: 'chip',
                key: {
                  component: 'text/plain',
                  text: translation.partOfSpeech.join(', '),
                },
              },
              ...translation.translatedWord.map(
                (_, twIndex): Plain => ({
                  component: 'text/plain',
                  reference: `translations.${index}.translatedWord.${twIndex}`,
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
                reference: 'form',
              },
              ...(word.tags ?? []).map(
                (tag): Chip => ({
                  component: 'chip',
                  key: { component: 'text/plain', text: tag.name },
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
