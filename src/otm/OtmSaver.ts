import { writeFileSync } from 'fs';

import { Otm } from './Otm';
import { Saver } from './Saver';

export default class OtmSaver extends Saver {
  private size = 1;

  private count = 0;

  // ? See https://github.com/typescript-eslint/typescript-eslint/issues/948
  // eslint-disable-next-line no-useless-constructor
  public constructor(dictionary: Otm, path: string) {
    super(dictionary, path);
  }

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
    writeFileSync(
      this.path,
      JSON.stringify(dictionary.toPlain(), null, '    '),
    );
    this.count += 1;
    this.emitProgress();
  }

  private emitProgress(): void {
    this.emit('progress', this.count, this.size);
  }
}
