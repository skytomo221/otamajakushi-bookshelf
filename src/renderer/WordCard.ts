export interface WordCard {
  form: string;
  id: string;
  translations?: Translation[];
  tags?: Tag[];
  contents?: Content[];
  option?: Option;
}

export interface Tag {
  name: string;
  value?: string;
  option?: Option;
}

export interface Content {
  title: string;
  type: string;
  description: string;
  option?: Option;
}

export interface Translation {
  translatedWord: string[];
  partOfSpeech: string[];
  option?: Option;
}

export interface Link {
  relation: string;
  form: string;
  id: string;
  option?: Option;
}

export interface Conjugation {
  type: string;
  form: string;
}

export interface Option {
  [key: string]: string | number | boolean;
}
