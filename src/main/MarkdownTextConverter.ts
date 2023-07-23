import MarkdownIt from 'markdown-it';
import { TextConverterProperties } from 'otamashelf/ExtensionProperties';
import TextConverter, {
  ConvertProps,
  ConvertReturns,
} from 'otamashelf/TextConverter';

export default class MarkdownTextConverter extends TextConverter {
  properties: TextConverterProperties = {
    action: 'properties',
    name: 'Markdown Text Converter',
    id: 'markdown-text-converter',
    version: '0.1.0',
    author: 'skytomo221',
    mime: 'text/markdown',
    type: 'text-converter',
  };

  // eslint-disable-next-line class-methods-use-this
  convert({ text }: ConvertProps): Promise<ConvertReturns> {
    const md = new MarkdownIt();
    return Promise.resolve({
      action: 'convert',
      status: 'resolve',
      returns: {
        html: md.render(text),
      },
    });
  }
}
