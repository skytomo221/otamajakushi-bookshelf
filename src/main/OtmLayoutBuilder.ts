import {
  LayoutCard,
  LayoutChip,
  LayoutRecursion,
  LayoutString,
} from '../renderer/LayoutCard';
import { WordCard, Content, Translation } from '../renderer/WordCard';

import LayoutBuilder from './LayoutBuilder';

export default class OtmLayoutBuilder extends LayoutBuilder {
  public readonly name = 'OTM Layout Builder';

  public readonly author = 'skytomo221';

  public readonly id = 'otm-layout-builder';

  public readonly version = '0.1.0';

  public readonly layout = (word: WordCard): LayoutCard => {
    const contents = (word.contents ?? []).map(
      (content: Content): LayoutRecursion => ({
        component: 'recursion',
        contents: [
          {
            component: 'title',
            contents: [
              {
                component: 'string',
                text: content.title,
              },
            ],
          },
          {
            component: 'body2',
            contents: [
              {
                component: 'string',
                text: content.description,
              },
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
