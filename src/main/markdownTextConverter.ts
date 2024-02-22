import MarkdownIt from 'markdown-it';
import { ConfigurationReturns } from 'otamashelf/ExtensionBase';
import { ConfigurationPage } from 'otamashelf/Page';
import {
  ConvertProps,
  ConvertReturns,
  TextConverter,
} from 'otamashelf/TextConverter';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: 'simple-configuration-format-v1',
  data: {},
};

const markdownTextConverter: TextConverter = {
  properties: {
    name: 'Markdown Text Converter',
    id: '@skytomo221/markdown-text-converter',
    version: '1.0.0',
    author: 'skytomo221',
    mime: 'text/markdown',
    type: 'text-converter',
  },
  configuration(): ConfigurationReturns {
    return { configuration };
  },
  convert({ text }: ConvertProps): Promise<ConvertReturns> {
    const md = new MarkdownIt();
    return Promise.resolve({
      html: md.render(text),
    });
  },
};

export default markdownTextConverter;
