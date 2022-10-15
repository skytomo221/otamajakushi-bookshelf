import { LayoutCard } from '../renderer/LayoutCard';
import { WordCard } from '../renderer/WordCard';

import Extension from './Extension';

export default abstract class LayoutBuilder extends Extension {
    public readonly extensionType = 'layout-builder';

    abstract readonly layout: (word: WordCard) => LayoutCard;
}
