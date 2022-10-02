import {
  LayoutCard,
  LayoutChip,
  LayoutRecursion,
} from '../renderer/LayoutCard';
import {
  WordCard,
  Content,
  Translation,
} from '../renderer/WordCard';
import { SummaryWord } from '../renderer/SummaryWord';

export default class OtmLayoutBuilder {
  public static layout(word: SummaryWord, renderer: WordCard): LayoutCard {
    const contents = (renderer.contents ?? []).map(
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
    const translations = (renderer.translations ?? []).map(
      (translation: Translation): LayoutRecursion => ({
        component: 'recursion',
        contents: [
          {
            component: 'body1',
            contents: [
              {
                component: 'chip',
                label: translation.partOfSpeech.join(', '),
              },
              {
                component: 'string',
                text: translation.translatedWord.join(', '),
              },
            ],
          },
        ],
      }),
    );
    return {
      word,
      layout: {
        component: 'recursion',
        contents: [
          {
            component: 'form',
            contents: [
              {
                component: 'string',
                text: renderer.form,
              },
              ...(renderer.tags ?? []).map(
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
  }
}
