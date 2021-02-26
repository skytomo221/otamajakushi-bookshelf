import IWord from './IWord';
import IZpdic from './IZpdic';

export default interface IOtm {
  words: IWord[];
  version: number;
  zpdic?: IZpdic;
}
