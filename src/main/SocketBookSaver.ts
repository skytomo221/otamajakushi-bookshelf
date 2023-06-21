import * as net from 'node:net';

import BookSaver, { SaveProps, SaveReturns } from 'otamashelf/BookSaver';
import { BookSaverProperties } from 'otamashelf/ExtensionProperties';

export default class SocketBookSaver extends BookSaver {
  readonly properties: BookSaverProperties;

  socket: net.Socket;

  constructor(properties: BookSaverProperties, socket: net.Socket) {
    super();
    this.properties = properties;
    this.socket = socket;
  }

  save(props: SaveProps): Promise<SaveReturns> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'save') {
          this.socket.removeListener('data', onData);
          resolve(data as SaveReturns);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify(props));
    });
  }
}
