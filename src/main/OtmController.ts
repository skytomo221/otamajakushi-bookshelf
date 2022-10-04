import { Otm } from '../otm/Otm';
import { WordCard, Content, Tag } from '../renderer/WordCard';

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

  public update(word: WordCard): number {
    this.otm.updateWord({
      filter: w => w.entry.id === parseInt(word.id, 10),
      map: () => ({
        entry: {
          form: word.form,
        },
        tags: word.tags?.map(tag => tag.name) ?? [],
        contents:
          word.contents?.map(content => ({
            title: content.title,
            markdown:
              content.type === 'text/markdown'
                ? content.description
                : undefined,
            text: content.description,
          })) ?? [],
        translations:
          word.translations?.map(translation => ({
            title: translation.partOfSpeech.join('・'),
            forms: translation.translatedWord,
          })) ?? [],
      }),
    });
    return parseInt(word.id, 10);
  }
}
