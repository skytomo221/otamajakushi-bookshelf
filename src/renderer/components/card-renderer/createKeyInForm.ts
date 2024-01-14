import { FormDivComponent } from 'otamashelf/LayoutCard';

export function convertReferenceInForm(
  layoutComponent: FormDivComponent[],
  flattenCard: { [key: string]: string },
): { [key: string]: unknown }[] {
  return layoutComponent.map((child, index) => {
    if (typeof child === 'string') return { text: child };
    const { component } = child;
    switch (component) {
      case 'chip':
      case 'mime':
        return { index, ...child };
      case 'input': {
        switch (child.type) {
          case 'reset':
          case 'submit':
            return { index, ...child };
          case 'date':
          case 'datetime-local':
          case 'month':
          case 'time':
          case 'week':
          case 'number':
          case 'range':
            return {
              index,
              ...child,
              reference: flattenCard[child.reference],
            };
          case 'password':
          case 'search':
          case 'tel':
          case 'url':
            return {
              index,
              ...child,
              reference: flattenCard[child.reference],
              ...(child.pattern && { pattern: child.pattern }),
            };
          case 'checkbox':
          case 'radio':
            return {
              index,
              ...child,
              checked: flattenCard[child.checked],
            };
          default:
            return {
              index,
              ...child,
              reference: flattenCard[child.reference],
            };
        }
      }
      case 'datalist':
        return { index, ...child };
      case 'label': {
        return {
          index,
          ...child,
          for: child.for,
          ...(child.contents && {
            components: convertReferenceInForm(child.contents, flattenCard),
          }),
        };
      }
      case 'select':
        return {
          index,
          ...child,
          reference: flattenCard[child.reference],
        };
      case 'textarea':
        return {
          index,
          ...child,
          reference: flattenCard[child.reference],
          ...(child.placeholder && { placeholder: child.placeholder }),
          ...(child.rows && { rows: child.rows }),
          ...(child.cols && { cols: child.cols }),
          ...(child.wrap && { wrap: child.wrap }),
        };
      default:
        return {
          index,
          ...child,
          contents: convertReferenceInForm(child.contents, flattenCard),
        };
    }
  });
}

export default function createKeyInForm(
  contents: FormDivComponent[],
  index: number,
  flattenCard: { [key: string]: string },
): string {
  return JSON.stringify({
    index,
    ...convertReferenceInForm(contents, flattenCard)[index],
  });
}
