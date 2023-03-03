import * as net from 'net';

import BookController from './BookController';
import Extension from './Extension';
import LayoutBuilder from './LayoutBuilder';
import { PageCard } from './PageCard';
import PageExplorer from './PageExplorer';
import StyleTheme from './StyleTheme';

export default class OtamajakushiBookshelfClient {
  extension: Extension;

  constructor(extension: Extension) {
    this.extension = extension;
  }

  public activate(port: number): void {
    const client = net.connect(port, 'localhost', () =>
      client.write(JSON.stringify(this.childActivate('properties', undefined))),
    );
    client.on('data', buffer => {
      const { action, data } = JSON.parse(buffer.toString());
      const result = this.childActivate(action, data);
      client.write(JSON.stringify(result));
    });
  }

  childActivate(action: string, data: any) {
    if (action === 'properties') {
      return (this.extension as Extension).properties();
    }
    switch (this.extension.constructor) {
      case BookController:
        switch (action) {
          case 'createPage':
            return (this.extension as BookController).createPage(
              data.templateId,
            );
          case 'deletePage':
            return (this.extension as BookController).deletePage(data.id);
          case 'readPage':
            return (this.extension as BookController).readPage(data.id);
          case 'readPages':
            return (this.extension as BookController).readPages(data.ids);
          case 'updatePage':
            return (this.extension as BookController).updatePage(data.word);
          case 'readSearchModes':
            return (this.extension as BookController).readSearchModes();
          case 'readSearchIndexes':
            return (this.extension as BookController).readSearchIndexes(
              data.searchModeId,
            );
          case 'readTemplates':
            return (this.extension as BookController).readTemplates();
          case 'onClick':
            return (this.extension as BookController).onClick(
              data.scriptm,
              data.id,
            );
          case 'newBook':
            return (this.extension as BookController).newBook(data.path);
          case 'load':
            return (this.extension as BookController).load(data.path);
          case 'save':
            return (this.extension as BookController).save(data.path);
          default:
            break;
        }
        break;
      case LayoutBuilder:
        switch (action) {
          case 'layout':
            return (this.extension as LayoutBuilder).layout(data.word);
          case 'indexes':
            return (this.extension as LayoutBuilder).indexes(data.words);
          default:
            break;
        }
        break;
      case PageExplorer:
        switch (action) {
          case 'name':
            return (this.extension as PageExplorer).name();
          case 'search':
            return (this.extension as PageExplorer).search(
              data.cards,
              data.searchWord,
            );
          default:
            break;
        }
        break;
      case StyleTheme:
        switch (action) {
          case 'style':
            return (this.extension as StyleTheme).style();
          default:
            break;
        }
        break;
      default:
        break;
    }
    return undefined;
  }
}
