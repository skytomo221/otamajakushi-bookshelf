import * as net from 'node:net';

import BookIndexer, {
  SearchIndexesProps,
  SearchIndexesReturns,
  SearchModesProps,
  SearchModesReturns,
} from 'otamashelf/BookIndexer';
import { BookIndexerProperties } from 'otamashelf/ExtensionProperties';

export default class SocketBookIndexer extends BookIndexer {
  readonly properties: BookIndexerProperties;

  socket: net.Socket;

  constructor(properties: BookIndexerProperties, socket: net.Socket) {
    super();
    this.properties = properties;
    this.socket = socket;
  }

  readSearchModes(props: SearchModesProps): Promise<SearchModesReturns> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'search-modes') {
          this.socket.removeListener('data', onData);
          resolve(data as SearchModesReturns);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify(props));
    });
  }

  readSearchIndexes(props: SearchIndexesProps): Promise<SearchIndexesReturns> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'search-indexes') {
          this.socket.removeListener('data', onData);
          resolve(data as SearchIndexesReturns);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify(props));
    });
  }
}
