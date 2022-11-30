export interface LayoutCard {
  layout: LayoutComponent;
  option?: LayoutOption;
}

export type LayoutComponent =
  | Button
  | Div
  | Divider
  | H2
  | H3
  | H4
  | H5
  | H6
  | P
  | Span
  | Array
  | Chip
  | DraggableArray
  | Recursion
  | Plain
  | Markdown;

export interface LayoutBaseComponent {
  component: string;
  class?: string;
  option?: LayoutOption;
}

export type Button = LayoutBaseComponent & {
  component: 'button';
  onClick: string;
  contents: LayoutComponent[];
};

export type Div = LayoutBaseComponent & {
  component: 'div';
  contents: LayoutComponent[];
};

export type Divider = LayoutBaseComponent & {
  component: 'divider';
};

export type H2 = LayoutBaseComponent & {
  component: 'h2';
  contents: LayoutComponent[];
};

export type H3 = LayoutBaseComponent & {
  component: 'h3';
  contents: LayoutComponent[];
};

export type H4 = LayoutBaseComponent & {
  component: 'h4';
  contents: LayoutComponent[];
};

export type H5 = LayoutBaseComponent & {
  component: 'h5';
  contents: LayoutComponent[];
};

export type H6 = LayoutBaseComponent & {
  component: 'h6';
  contents: LayoutComponent[];
};

export type P = LayoutBaseComponent & {
  component: 'p';
  contents: LayoutComponent[];
};

export type Span = LayoutBaseComponent & {
  component: 'span';
  contents: LayoutComponent[];
};

export type Array = LayoutBaseComponent & {
  component: 'array';
  baseReference: string;
  content: LayoutComponent;
};

export type Chip = LayoutBaseComponent & {
  component: 'chip';
  key: Plain;
  value?: Plain;
};

export type DraggableArray = LayoutBaseComponent & {
  component: 'draggable-array';
  baseReference: string;
  content: LayoutComponent;
};

export type Recursion = LayoutBaseComponent & {
  component: 'recursion';
  contents: LayoutComponent[];
};

export type Plain = LayoutBaseComponent &
  (
    | {
        component: 'text/plain';
        text: string;
      }
    | {
        component: 'text/plain';
        reference: string;
      }
  );

export type Markdown = LayoutBaseComponent &
  (
    | {
        component: 'text/markdown';
        text: string;
      }
    | {
        component: 'text/markdown';
        reference: string;
      }
  );

export type LayoutOption = {
  [key: string]: string | number | boolean;
};
