import { FormDivComponent } from 'otamashelf/LayoutCard';
import { createContext } from 'react';

type PageRendererInFormContextType = {
  submit: () => void;
  reset: () => void;
  inputs: FormDivComponent[];
  flattenCard: { [key: string]: string };
  setFlattenCard: (flattenCard: { [key: string]: string }) => void;
};

export const PageRendererInFormContext =
  createContext<PageRendererInFormContextType>(undefined as never);
