import * as net from 'node:net';

import { PageExplorerProperties } from 'otamashelf/ExtensionProperties';
import PageExplorer, {
  NameProps,
  SearchProps,
  SearchReturns,
} from 'otamashelf/PageExplorer';

export default class SocketPageeExplorer extends PageExplorer {
  readonly properties: PageExplorerProperties;

  socket: net.Socket;

  constructor(properties: PageExplorerProperties, socket: net.Socket) {
    super();
    this.properties = properties;
    this.socket = socket;
  }

  name: (props: NameProps) => Promise<string> = props =>
    new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'name') {
          this.socket.removeListener('data', onData);
          resolve(data as string);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify(props));
    });

  search: (props: SearchProps) => Promise<SearchReturns> = props =>
    new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'search') {
          this.socket.removeListener('data', onData);
          resolve(data as SearchReturns);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify(props));
    });
}
