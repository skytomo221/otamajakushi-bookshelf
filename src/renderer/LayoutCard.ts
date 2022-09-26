import { SummaryWord } from "./SummaryWord";

export interface LayoutCard {
  word: SummaryWord;
  layout: LayoutComponent;
  option?: LayoutOption;
}

export type LayoutComponent =
  | LayoutRecursion
  | LayoutDivider
  | LayoutChip
  | LayoutForm
  | LayoutTitle
  | LayoutText;

export interface LayoutBaseComponent {
  component: string;
  option?: LayoutOption;
}

export type LayoutRecursion = LayoutBaseComponent & {
  component: 'recursion';
  contents: LayoutComponent[];
};

export type LayoutDivider = LayoutBaseComponent & {
  component: 'divider';
};

export type LayoutChip = LayoutBaseComponent & {
  component: 'chip';
  label: string;
};

export type LayoutForm = LayoutBaseComponent & {
  component: 'form';
  form: string;
};

export type LayoutTitle = LayoutBaseComponent & {
  component: 'title';
  title: string;
};

export type LayoutText = LayoutBaseComponent & {
  component: 'text';
  text: string;
};

export type LayoutOption = {
  [key: string]: string | number | boolean;
};
