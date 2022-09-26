import { LayoutCard, LayoutRecursion } from '../renderer/LayoutCard';
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
            title: content.title,
          },
          {
            component: 'text',
            text: content.description,
          },
        ],
      }),
    );
    const translations = (renderer.translations ?? []).map(
      (translation: RendererTranslation): LayoutRecursion => ({
        component: 'recursion',
        contents: [
          {
            component: 'chip',
            label: translation.partOfSpeech.join(', '),
          },
          {
            component: 'text',
            text: translation.translatedWord.join(', '),
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
            form: renderer.form,
          },
          ...translations,
          ...contents,
        ],
      },
    };
  }
}
