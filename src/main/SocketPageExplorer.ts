import * as net from 'node:net';

import { PageExplorerProperties } from 'otamashelf/ExtensionProperties';
import PageExplorer, {
  NameProps,
  NameReturns,
  SearchProps,
  SearchReturns,
} from 'otamashelf/PageExplorer';

export default class SocketPageExplorer extends PageExplorer {
  readonly properties: PageExplorerProperties;

  socket: net.Socket;

  constructor(properties: PageExplorerProperties, socket: net.Socket) {
    super();
    this.properties = properties;
    this.socket = socket;
  }

  name: (props: NameProps) => Promise<NameReturns> = props =>
    new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'name') {
          this.socket.removeListener('data', onData);
          resolve(data as NameReturns);
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
