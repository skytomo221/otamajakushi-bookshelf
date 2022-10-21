import { LayoutBuilderProperties } from '../common/ExtensionProperties';
import LayoutBuilder from '../common/LayoutBuilder';
import {
  LayoutCard,
  LayoutChip,
  LayoutComponent,
  LayoutRecursion,
  LayoutString,
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
      (content: Content, index: number): LayoutRecursion => ({
        component: 'recursion',
        contents: [
          {
            component: 'title',
            contents: [
              {
                component: 'string',
                text: content.title,
              } as LayoutComponent,
            ],
          },
          {
            component: 'body2',
            contents: [
              {
                component:
                  content.type === 'text/markdown' ? 'text/markdown' : 'string',
                reference: `contents.${index}.description`,
              } as LayoutComponent,
            ],
          },
        ],
      }),
    );
    const translations = (word.translations ?? []).map(
      (translation: Translation, index: number): LayoutRecursion => ({
        component: 'recursion',
        contents: [
          {
            component: 'body1',
            contents: [
              {
                component: 'chip',
                label: translation.partOfSpeech.join(', '),
              },
              ...translation.translatedWord.map(
                (_, twIndex): LayoutString => ({
                  component: 'string',
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
            component: 'form',
            contents: [
              {
                component: 'string',
                reference: 'form',
              },
              ...(word.tags ?? []).map(
                (tag): LayoutChip => ({
                  component: 'chip',
                  label: tag.name,
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
