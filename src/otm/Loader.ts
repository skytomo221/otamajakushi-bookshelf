import { EventEmitter } from 'events';

import { Otm } from './Otm';

export abstract class Loader extends EventEmitter {
  protected readonly path: string;

  public minProgressInterval = 100;

  private lastProgressDate: Date | null = null;

  protected constructor(path: string) {
    super();
    this.path = path;
  }

  public asPromise(listeners: LoaderEventListeners = {}): Promise<Otm> {
    const promise = new Promise<Otm>((resolve, reject) => {
      if (listeners.onProgress) {
        this.on('progress', listeners.onProgress);
      }
      this.on('end', dictionary => {
        if (listeners.onEnd) {
          listeners.onEnd(dictionary);
        }
        resolve(dictionary);
      });
      this.on('error', error => {
        if (listeners.onError) {
          listeners.onError(error);
        }
        reject(error);
      });
      this.start();
    });
    return promise;
  }

  public on<E extends keyof LoaderEvent>(
    event: E,
    listener: (...args: LoaderEvent[E]) => void,
  ): this;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public on(event: string | symbol, listener: (...args: any) => void): this {
    const result = super.on(event, listener);
    return result;
  }

  public emit<E extends keyof LoaderEvent>(
    event: E,
    ...args: LoaderEvent[E]
  ): boolean;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public emit(event: string | symbol, ...args: any): boolean {
    if (event === 'progress') {
      const date = new Date();
      const lastDate = this.lastProgressDate;
      if (
        lastDate === null ||
        date.getTime() - lastDate.getTime() >= this.minProgressInterval
      ) {
        const result = super.emit(event, ...args);
        this.lastProgressDate = date;
        return result;
      }
      return false;
    }
    const result = super.emit(event, ...args);
    return result;
  }

  public abstract start(): void;
}

export type LoaderEvent = {
  progress: [offset: number, size: number];
  end: [dictionary: Otm];
  error: [error: Error];
};
export type LoaderEventListeners = {
  [E in keyof LoaderEvent as `on${Capitalize<E>}`]?: (
    ...args: LoaderEvent[E]
  ) => void;
};
