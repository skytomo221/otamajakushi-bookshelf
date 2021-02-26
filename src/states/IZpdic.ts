import IWord from './IWord';

export default interface IZpdic {
  alphabetOrder: string;
  plainInformationTitles: number;
  informationTitleOrder?: string[];
  defaultWord: IWord;
}
