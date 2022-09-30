import {
  LayoutCard,
  LayoutChip,
  LayoutRecursion,
} from '../renderer/LayoutCard';
import {
  RendererCard,
  RendererContent,
  RendererTranslation,
} from '../renderer/RendererCard';
import { SummaryWord } from '../renderer/SummaryWord';

export default class OtmLayoutBuilder {
  public static layout(word: SummaryWord, renderer: RendererCard): LayoutCard {
    const contents = (renderer.contents ?? []).map(
      (content: RendererContent): LayoutRecursion => ({
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
            component: 'text',
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
      (translation: RendererTranslation): LayoutRecursion => ({
        component: 'recursion',
        contents: [
          {
            component: 'text',
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
