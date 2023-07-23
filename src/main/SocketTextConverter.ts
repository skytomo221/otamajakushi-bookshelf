import * as net from 'node:net';

import { TextConverterProperties } from 'otamashelf/ExtensionProperties';
import TextConverter, {
    ConvertProps,
    ConvertReturns,
} from 'otamashelf/TextConverter';

export default class SocketTextConverter extends TextConverter {
  readonly properties: TextConverterProperties;

  socket: net.Socket;

  constructor(properties: TextConverterProperties, socket: net.Socket) {
    super();
    this.properties = properties;
    this.socket = socket;
  }

  convert(props: ConvertProps): Promise<ConvertReturns> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'convert') {
          this.socket.removeListener('data', onData);
          resolve(data as ConvertReturns);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify(props));
    });
  }
}
