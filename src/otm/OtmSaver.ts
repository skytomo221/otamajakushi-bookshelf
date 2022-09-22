import { writeFileSync } from 'fs';

import { Saver } from './Saver';

export default class OtmSaver extends Saver {
  private size = 1;

  private count = 0;

  public start(): void {
    const promise = Promise.resolve().then(this.saveDictionary.bind(this));
    promise
      .then(() => {
        this.emit('end');
      })
      .catch(error => {
        this.emit('error', error);
      });
  }

  private async saveDictionary(): Promise<void> {
    const { dictionary } = this;
    writeFileSync(this.path, JSON.stringify(dictionary.toPlain()));
    this.count += 1;
    this.emitProgress();
  }

  private emitProgress(): void {
    this.emit('progress', this.count, this.size);
  }
}
