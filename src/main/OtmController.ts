import { Otm } from '../otm/Otm';
import { RendererCard } from '../renderer/RendererCard';

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
      translations: word.translations.map(translation => ({
          partOfSpeech: [translation.title],
          translatedWord: translation.forms,
        })),
    };
  }
}
