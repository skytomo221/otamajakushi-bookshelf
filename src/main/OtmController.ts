import { Otm } from '../otm/Otm';
import { Word } from '../otm/Word';
import { SummaryWord } from '../renderer/SummaryWord';
import { WordCard, Content, Tag } from '../renderer/WordCard';

import DictionaryController from './DictionaryController';

export default class OtmController extends DictionaryController {
  private otm: Otm;

  public constructor(otm: Otm) {
    super();
    this.otm = otm;
  }

  protected static toWordCard(word: Word): WordCard {
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

  public readWords(): WordCard[] {
    return this.otm.toPlain().words.map(word => OtmController.toWordCard(word));
  }

  public readWord(id: number): WordCard {
    const word = this.otm.toPlain().words.find(w => w.entry.id === id);
    if (!word) {
      throw new Error('card not found');
    }
    return OtmController.toWordCard(word);
  }

  public updateWord(word: WordCard): number {
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
