import MarkdownIt from 'markdown-it';
import {
  ConvertProps,
  ConvertReturns,
  TextConverter,
} from 'otamashelf/TextConverter';

const plainTextConverter: TextConverter = {
  properties: {
    name: 'Markdown Text Converter',
    id: '@skytomo221/plain-text-converter',
    version: '1.0.0',
    author: 'skytomo221',
    mime: 'text/plain',
    type: 'text-converter',
  },
  defaultConfiguration() {
    return { configuration: {}, configurationsSchema: {} };
  },
  convert({ text }: ConvertProps): Promise<ConvertReturns> {
    const md = new MarkdownIt();
    return Promise.resolve({
      html: md.render(text),
    });
  },
};

export default plainTextConverter;
