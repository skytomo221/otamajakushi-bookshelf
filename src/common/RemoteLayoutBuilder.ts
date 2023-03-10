import * as net from 'net';

import LayoutBuilder from './LayoutBuilder';

export default abstract class RemoteLayoutBuilder extends LayoutBuilder {
  public activate(port: number): void {
    const client: net.Socket = net.connect(port, 'localhost', () => {
      console.log("Connected to Otamajakushi Bookshelf's server.");
    });
    client.on('data', async (buffer: { toString: () => string }) => {
      const { action, data } = JSON.parse(buffer.toString());
      const result = await this.call(action, data);
      client.write(JSON.stringify({ action, data: result }));
    });
  }

  private call(action: string, data: any) {
    switch (action) {
      case 'properties':
        return this.properties();
      case 'layout':
        return this.layout(data.word);
      case 'indexes':
        return this.indexes(data.words);
      default:
        break;
    }
  }
}
