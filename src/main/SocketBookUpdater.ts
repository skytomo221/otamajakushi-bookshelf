import * as net from 'node:net';

import BookUpdater, {
  UpdateBookProps,
  UpdateBookReturns,
} from 'otamashelf/BookUpdater';
import { BookUpdaterProperties } from 'otamashelf/ExtensionProperties';

export default class SocketBookUpdater extends BookUpdater {
  readonly properties: BookUpdaterProperties;

  socket: net.Socket;

  constructor(properties: BookUpdaterProperties, socket: net.Socket) {
    super();
    this.properties = properties;
    this.socket = socket;
  }

  updateBook(props: UpdateBookProps): Promise<UpdateBookReturns> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'update-book') {
          this.socket.removeListener('data', onData);
          resolve(data as UpdateBookReturns);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify(props));
    });
  }
}
