import {
  LayoutCard,
  LayoutChip,
  LayoutRecursion,
  LayoutString,
} from '../renderer/LayoutCard';
import { SummaryWord } from '../renderer/SummaryWord';
import { WordCard, Content, Translation } from '../renderer/WordCard';

export default class OtmLayoutBuilder {
  public static layout(summary: SummaryWord, word: WordCard): LayoutCard {
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
      summary,
      word,
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
  }
}
