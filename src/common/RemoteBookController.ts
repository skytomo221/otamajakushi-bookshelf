import * as net from 'net';

import BookController from './BookController';

export default abstract class RemoteBookController extends BookController {
  public activate(port: number): void {
    const client: net.Socket = net.connect(port, 'localhost', () => {
      console.log("Connected to Otamajakushi Bookshelf's server.");
    });
    client.on('data', async (buffer: { toString: () => string }) => {
      const { action, data } = JSON.parse(buffer.toString());
      const result = await this.call(action, data);
      client.write(JSON.stringify({ action, data: result }));
    });
  }

  private call(action: string, data: any) {
    switch (action) {
      case 'properties':
        return this.properties();
      case 'createPage':
        return this.createPage(data.templateId);
      case 'deletePage':
        return this.deletePage(data.id);
      case 'readPage':
        return this.readPage(data.id);
      case 'readPages':
        return this.readPages(data.ids);
      case 'updatePage':
        return this.updatePage(data.word);
      case 'readSearchModes':
        return this.readSearchModes();
      case 'readSearchIndexes':
        return this.readSearchIndexes(data.searchModeId);
      case 'readTemplates':
        return this.readTemplates();
      case 'onClick':
        return this.onClick(data.scriptm, data.id);
      case 'newBook':
        return this.newBook(data.path);
      case 'load':
        return this.load(data.path);
      case 'save':
        return this.save(data.path);
      default:
        break;
    }
  }
}
