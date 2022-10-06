import { readFileSync } from 'fs';

import { fold } from 'fp-ts/Either';
import { parse, Json } from 'fp-ts/Json';
import { pipe } from 'fp-ts/function';

import { Loader } from './Loader';
import { Otm, PlainOtm, TPlainOtm } from './Otm';

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
    return pipe(
      json,
      parse,
      fold(
        (error: unknown) => {
          throw error;
        },
        (otmjson: Json) => {
          this.count += 1;
          this.emitProgress();
          return pipe(
            otmjson,
            TPlainOtm.decode,
            fold(
              (error: unknown) => {
                throw error;
              },
              (otm: PlainOtm) => {
                this.count += 1;
                this.emitProgress();
                const dictionary = Otm.fromPlain(otm);
                this.count += 1;
                this.emitProgress();
                return dictionary;
              },
            ),
          );
        },
      ),
    );
  }

  private emitProgress(): void {
    this.emit('progress', this.count, this.size);
  }
}
