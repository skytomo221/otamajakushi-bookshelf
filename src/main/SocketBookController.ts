import * as net from 'node:net';

import BookController from '../common/BookController';
import { BookControllerProperties } from '../common/ExtensionProperties';
import { PageCard } from '../common/PageCard';
import { SearchCard } from '../common/SearchCard';
import TemplateProperties from '../common/TemplateProperties';

export default class SocketBookController extends BookController {
  socket: net.Socket;

  constructor(socket: net.Socket) {
    super();
    this.socket = socket;
  }

  public properties = async (): Promise<BookControllerProperties> =>
    new Promise(resolve => {
      this.socket.write(JSON.stringify({ action: 'properties' }));
      this.socket.on('data', buffer => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'properties') resolve(data as BookControllerProperties);
      });
    });

  createPage(templateId: string): Promise<string> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'createPage') {
          this.socket.removeListener('data', onData);
          resolve(data as string);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(
        JSON.stringify({ action: 'createPage', data: { templateId } }),
      );
    });
  }

  deletePage(id: string): Promise<boolean> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'deletePage') {
          this.socket.removeListener('data', onData);
          resolve(data as boolean);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify({ action: 'deletePage', data: { id } }));
    });
  }

  readPage(id: string): Promise<PageCard> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'readPage') {
          this.socket.removeListener('data', onData);
          resolve(data as PageCard);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify({ action: 'readPage', data: { id } }));
    });
  }

  readPages(ids: string[]): Promise<PageCard[]> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'readPages') {
          this.socket.removeListener('data', onData);
          resolve(data as PageCard[]);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify({ action: 'readPages', data: { ids } }));
    });
  }

  updatePage(word: PageCard): Promise<string> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'updatePage') {
          this.socket.removeListener('data', onData);
          resolve(data as string);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(
        JSON.stringify({ action: 'updatePage', data: { word } }),
      );
    });
  }

  readSearchModes(): Promise<string[]> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'readSearchModes') {
          this.socket.removeListener('data', onData);
          resolve(data as string[]);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify({ action: 'readSearchModes' }));
    });
  }

  readSearchIndexes(searchModeId: string): Promise<SearchCard[]> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'readSearchIndexes') {
          this.socket.removeListener('data', onData);
          resolve(data as SearchCard[]);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(
        JSON.stringify({ action: 'readSearchIndexes', data: { searchModeId } }),
      );
    });
  }

  readTemplates(): Promise<TemplateProperties[]> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'readTemplates') {
          this.socket.removeListener('data', onData);
          resolve(data as TemplateProperties[]);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(
        JSON.stringify({ action: 'readTemplates' }),
      );
    });
  }

  onClick(script: string, id: number): Promise<PageCard> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'onClick') {
          this.socket.removeListener('data', onData);
          resolve(data as PageCard);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(
        JSON.stringify({ action: 'onClick', data: { script, id } }),
      );
    });
  }

  newBook(path: string): Promise<BookController> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'newBook') {
          this.socket.removeListener('data', onData);
          resolve(data as BookController);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(
        JSON.stringify({ action: 'newBook', data: { path } }),
      );
    });
  }

  load(path: string): Promise<BookController> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'load') {
          this.socket.removeListener('data', onData);
          resolve(data as BookController);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(
        JSON.stringify({ action: 'load', data: { path } }),
      );
    });
  }

  save(path: string): Promise<BookController> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'save') {
          this.socket.removeListener('data', onData);
          resolve(data as BookController);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(
        JSON.stringify({ action: 'save', data: { path } }),
      );
    });
  }
}
