import * as net from 'node:net';

import { PageCard, LayoutCard } from 'otamashelf';
import { LayoutBuilderProperties } from 'otamashelf/ExtensionProperties';
import LayoutBuilder from 'otamashelf/LayoutBuilder';

export default class SocketPageCreator extends LayoutBuilder {
  readonly properties: LayoutBuilderProperties;

  socket: net.Socket;

  constructor(properties: LayoutBuilderProperties, socket: net.Socket) {
    super();
    this.properties = properties;
    this.socket = socket;
  }

  layout: (word: PageCard) => Promise<LayoutCard> = props =>
    new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'name') {
          this.socket.removeListener('data', onData);
          resolve(data as LayoutCard);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify(props));
    });

  indexes: (words: PageCard[]) => Promise<LayoutCard[]> = props =>
    new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'name') {
          this.socket.removeListener('data', onData);
          resolve(data as LayoutCard[]);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify(props));
    });
}
