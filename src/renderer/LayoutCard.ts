export interface LayoutCard {
  layout: LayoutComponent;
  option?: LayoutOption;
}

export type LayoutComponent =
  | LayoutRecursion
  | LayoutDivider
  | LayoutChip
  | LayoutForm
  | LayoutTitle
  | LayoutBody1
  | LayoutBody2
  | LayoutString;

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
  contents: LayoutComponent[];
};

export type LayoutTitle = LayoutBaseComponent & {
  component: 'title';
  contents: LayoutComponent[];
};

export type LayoutBody1 = LayoutBaseComponent & {
  component: 'body1';
  contents: LayoutComponent[];
};

export type LayoutBody2 = LayoutBaseComponent & {
  component: 'body2';
  contents: LayoutComponent[];
};

export type LayoutString = LayoutBaseComponent &
  (
    | {
        component: 'string';
        text: string;
      }
    | {
        component: 'string';
        reference: string;
      }
  );

export type LayoutOption = {
  [key: string]: string | number | boolean;
};
