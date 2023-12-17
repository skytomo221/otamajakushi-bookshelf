import { flatten } from 'flat';
import { LayoutComponent } from 'otamashelf/LayoutCard';
import { PageCard } from 'otamashelf/PageCard';

function convertReference(
  layoutComponent: LayoutComponent[],
  word: PageCard,
): { [key: string]: unknown }[] {
  return layoutComponent.map((child, index) => {
    const { component } = child;
    switch (component) {
      case 'chip':
      case 'divider':
      case 'text':
        return { index, ...child };
      case 'reference': {
        const flattenCard = flatten(word) as { [key: string]: string };
        return {
          index,
          ...child,
          reference: flattenCard[child.reference],
        };
      }
      default:
        return {
          index,
          ...child,
          contents: convertReference(child.contents, word),
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
    ...convertReference(contents, word)[index],
  });
}
