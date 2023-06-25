import * as net from 'node:net';

import BookLoader, { LoadProps, LoadReturns } from 'otamashelf/BookLoader';
import { BookLoaderProperties } from 'otamashelf/ExtensionProperties';

export default class SocketBookLoader extends BookLoader {
  readonly properties: BookLoaderProperties;

  socket: net.Socket;

  constructor(properties: BookLoaderProperties, socket: net.Socket) {
    super();
    this.properties = properties;
    this.socket = socket;
  }

  load(props: LoadProps): Promise<LoadReturns> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'load') {
          this.socket.removeListener('data', onData);
          resolve(data as LoadReturns);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify(props));
    });
  }
}
