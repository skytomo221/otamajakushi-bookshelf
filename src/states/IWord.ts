import IEntry from './IEntry';
import ITranslation from './ITranslation';

export default interface IWord {
  entry: IEntry;
  translations: ITranslation[];
}
