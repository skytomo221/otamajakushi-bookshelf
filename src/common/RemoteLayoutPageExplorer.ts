import * as net from 'net';

import PageExplorer from './PageExplorer';

export default abstract class RemotePageExplorer extends PageExplorer {
  public activate(port: number): void {
    const client: net.Socket = net.connect(port, 'localhost');
    client.on('data', async (buffer: { toString: () => string }) => {
      const { action, data } = JSON.parse(buffer.toString());
      const result = await this.call(action, data);
      client.write(JSON.stringify({ action, data: result }));
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private call(action: string, data: any) {
    switch (action) {
      case 'properties':
        return this.properties();
      case 'name':
        return this.name();
      case 'search':
        return this.search(data.cards, data.searchWord);
      default:
        throw new Error("Unknown action");
    }
  }
}
