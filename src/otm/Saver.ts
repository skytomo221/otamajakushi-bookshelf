import { EventEmitter } from 'events';

import { Otm } from './Otm';

export abstract class Saver extends EventEmitter {
  protected readonly dictionary: Otm;

  protected readonly path: string;

  public minProgressInterval = 100;

  private lastProgressDate: Date | null = null;

  protected constructor(dictionary: Otm, path: string | null) {
    super();
    const nextPath = path ?? dictionary.path;
    if (nextPath !== null && nextPath !== undefined) {
      this.dictionary = dictionary;
      this.path = nextPath;
    } else {
      throw new Error('path not specified');
    }
  }

  public asPromise(listeners: SaverEventListeners = {}): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      if (listeners.onProgress) {
        this.on('progress', listeners.onProgress);
      }
      this.on('end', () => {
        if (listeners.onEnd) {
          listeners.onEnd();
        }
        resolve();
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

  public on<E extends keyof SaverEvent>(
    event: E,
    listener: (...args: SaverEvent[E]) => void,
  ): this;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public on(event: string | symbol, listener: (...args: any) => void): this {
    const result = super.on(event, listener);
    return result;
  }

  public emit<E extends keyof SaverEvent>(
    event: E,
    ...args: SaverEvent[E]
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

export type SaverEvent = {
  progress: [offset: number, size: number];
  end: [];
  error: [error: Error];
};
export type SaverEventListeners = {
  [E in keyof SaverEvent as `on${Capitalize<E>}`]?: (
    ...args: SaverEvent[E]
  ) => void;
};
