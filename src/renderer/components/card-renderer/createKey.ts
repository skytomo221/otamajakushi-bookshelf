import { flatten } from 'flat';
import { LayoutComponent } from 'otamashelf/LayoutCard';
import { PageCard } from 'otamashelf/PageCard';

import { convertReferenceInForm } from './createKeyInForm';

function convertReference(
  layoutComponent: LayoutComponent[],
  flattenCard: { [key: string]: string },
): { [key: string]: unknown }[] {
  return layoutComponent.map((child, index) => {
    if (typeof child === 'string') return { text: child };
    const { component } = child;
    switch (component) {
      case 'chip':
      case 'divider':
      case 'delete-button':
      case 'edit-button':
      case 'mime':
        return { index, ...child };
      case 'editable':
        return {
          index,
          ...child,
          inputs: convertReferenceInForm(child.inputs, flattenCard),
          outputs: convertReference(child.outputs, flattenCard),
        };
      default:
        return {
          index,
          ...child,
          contents: convertReference(child.contents, flattenCard),
        };
    }
  });
}

export default function createKey(
  contents: LayoutComponent[],
  index: number,
  word: PageCard,
): string {
  return JSON.stringify({
    index,
    ...convertReference(contents, flatten(word) as { [key: string]: string })[
      index
    ],
  });
}
