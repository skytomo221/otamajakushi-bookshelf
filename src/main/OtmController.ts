import { Otm } from '../otm/Otm';
import {
  RendererCard,
  RendererContent,
  RendererTag,
} from '../renderer/RendererCard';

export default class OtmController {
  private otm: Otm;

  public constructor(otm: Otm) {
    this.otm = otm;
  }

  public card(id: number): RendererCard {
    const word = this.otm.toPlain().words.find(w => w.entry.id === id);
    if (!word) {
      throw new Error('card not found');
    }
    return {
      form: word.entry.form,
      id: word.entry.id.toString(),
      tags: word.tags.map(
        (tag): RendererTag => ({
          name: tag,
        }),
      ),
      contents: word.contents.map(
        (content): RendererContent => ({
          title: content.title,
          type: content.markdown ? 'text/markdown' : 'text/plain',
          description: content.text,
        }),
      ),
      translations: word.translations.map(translation => ({
        partOfSpeech: [translation.title],
        translatedWord: translation.forms,
      })),
    };
  }
}
