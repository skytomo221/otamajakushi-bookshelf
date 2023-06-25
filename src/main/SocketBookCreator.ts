import * as net from 'node:net';

import BookCreator, {
  TemplatesProps,
  TemplatesReturns,
} from 'otamashelf/BookCreator';
import { BookCreatorProperties } from 'otamashelf/ExtensionProperties';

export default class SocketBookCreator extends BookCreator {
  readonly properties: BookCreatorProperties;

  socket: net.Socket;

  constructor(properties: BookCreatorProperties, socket: net.Socket) {
    super();
    this.properties = properties;
    this.socket = socket;
  }

  templates(props: TemplatesProps): Promise<TemplatesReturns> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'templates') {
          this.socket.removeListener('data', onData);
          resolve(data as TemplatesReturns);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify(props));
    });
  }
}
