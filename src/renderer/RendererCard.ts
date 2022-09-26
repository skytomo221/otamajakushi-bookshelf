export interface RendererCard {
  form: string;
  id: string;
  translations?: RendererTranslation[];
  tags?: RendererTag[];
  contents?: RendererContent[];
  option?: RendererOption;
}

export interface RendererTag {
  name: string;
  value: string;
  option?: RendererOption;
}

export interface RendererContent {
  title: string;
  type: string;
  description: string;
  option?: RendererOption;
}

export interface RendererTranslation {
  translatedWord: string[];
  partOfSpeech: string[];
  option?: RendererOption;
}

export interface RendererLink {
  relation: string;
  form: string;
  id: string;
  option?: RendererOption;
}

export interface RendererConjugation {
  type: string;
  form: string;
}

export interface RendererOption {
  [key: string]: string | number | boolean;
}
