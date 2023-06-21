import * as net from 'node:net';

import { PageCardCreatorProperties } from 'otamashelf/ExtensionProperties';
import PageCardCreator, {
  CreateProps,
  CreateReturns,
  TemplatesProps,
  TemplatesReturns,
} from 'otamashelf/PageCardCreator';

export default class SocketPageCardCreator extends PageCardCreator {
  readonly properties: PageCardCreatorProperties;

  socket: net.Socket;

  constructor(properties: PageCardCreatorProperties, socket: net.Socket) {
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

  create(props: CreateProps): Promise<CreateReturns> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'create') {
          this.socket.removeListener('data', onData);
          resolve(data as CreateReturns);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify(props));
    });
  }
}
