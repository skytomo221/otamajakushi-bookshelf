import { Otm } from '../otm/Otm';
import {
  WordCard,
  Content,
  Tag,
} from '../renderer/WordCard';

export default class OtmController {
  private otm: Otm;

  public constructor(otm: Otm) {
    this.otm = otm;
  }

  public card(id: number): WordCard {
    const word = this.otm.toPlain().words.find(w => w.entry.id === id);
    if (!word) {
      throw new Error('card not found');
    }
    return {
      form: word.entry.form,
      id: word.entry.id.toString(),
      tags: word.tags.map(
        (tag): Tag => ({
          name: tag,
        }),
      ),
      contents: word.contents.map(
        (content): Content => ({
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
