import Extension from '../main/Extension';

import { LayoutCard } from './LayoutCard';
import { WordCard } from './WordCard';


export default abstract class LayoutBuilder extends Extension {
    public readonly extensionType = 'layout-builder';

    abstract readonly layout: (word: WordCard) => LayoutCard;
}
