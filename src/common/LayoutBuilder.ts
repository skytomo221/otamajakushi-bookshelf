import Extension from './Extension';
import { LayoutBuilderProperties } from './ExtensionProperties';
import { LayoutCard } from './LayoutCard';
import { WordCard } from './WordCard';

export default abstract class LayoutBuilder extends Extension {
  public abstract readonly properties: LayoutBuilderProperties;

  abstract readonly layout: (word: WordCard) => LayoutCard;
}
