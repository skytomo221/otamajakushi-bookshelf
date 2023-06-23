import * as net from 'node:net';

import { PageProcessorProperties } from 'otamashelf/ExtensionProperties';
import PageProcessor, {
  ProcessPageProps,
  ProcessPageReturns,
} from 'otamashelf/PageProcessor';

export default class SocketPageProcessor extends PageProcessor {
  readonly properties: PageProcessorProperties;

  socket: net.Socket;

  constructor(properties: PageProcessorProperties, socket: net.Socket) {
    super();
    this.properties = properties;
    this.socket = socket;
  }

  processPage(props: ProcessPageProps): Promise<ProcessPageReturns> {
    return new Promise(resolve => {
      const onData = (buffer: Buffer) => {
        const { action, data } = JSON.parse(buffer.toString());
        if (action === 'templates') {
          this.socket.removeListener('data', onData);
          resolve(data as ProcessPageReturns);
        }
      };
      this.socket.on('data', onData);
      this.socket.write(JSON.stringify(props));
    });
  }
}
