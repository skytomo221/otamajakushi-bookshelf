import Extension from './Extension';
import { LayoutBuilderProperties } from './ExtensionProperties';
import { LayoutCard } from './LayoutCard';
import { PageCard } from './PageCard';

export default abstract class LayoutBuilder extends Extension {
  public abstract readonly properties: LayoutBuilderProperties;

  abstract readonly layout: (word: PageCard) => LayoutCard;

  abstract readonly indexes: (word: PageCard[]) => LayoutCard[];
}
