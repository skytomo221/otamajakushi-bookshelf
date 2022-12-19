import { readFileSync } from 'fs';

import Ajv from 'ajv';

import { Loader } from './Loader';
import { Otm, plainOtmScheme } from './Otm';

export default class OtmLoader extends Loader {
  private size = 3;

  private count = 0;

  public start(): void {
    const promise: Promise<Otm> = Promise.resolve().then(
      this.loadDictionary.bind(this),
    );
    promise
      .then(dictionary => {
        this.emit('end', dictionary);
      })
      .catch(error => {
        this.emit('error', error);
      });
  }

  // ? See https://github.com/typescript-eslint/typescript-eslint/issues/948
  // eslint-disable-next-line no-useless-constructor
  public constructor(path: string) {
    super(path);
  }

  private async loadDictionary(): Promise<Otm> {
    const buff = readFileSync(this.path);
    const json = buff.toString();
    const ajv = new Ajv();
    const plainOtm = JSON.parse(json);
    const valid = ajv.validate(plainOtmScheme, plainOtm);
    if (!valid) {
      throw new Error(ajv.errorsText());
    }
    this.count += 1;
    this.emitProgress();
    const dictionary = Otm.fromPlain(plainOtm);
    this.count += 1;
    this.emitProgress();
    return dictionary;
  }

  private emitProgress(): void {
    this.emit('progress', this.count, this.size);
  }
}
