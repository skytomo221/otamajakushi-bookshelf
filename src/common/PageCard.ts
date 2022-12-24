import { Json } from 'fp-ts/Json';

export interface PageCard {
  [key: string]: Json;
  id: string;
  title: string;
}
