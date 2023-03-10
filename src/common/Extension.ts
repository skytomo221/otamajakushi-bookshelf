import { ExtensionProperties } from './ExtensionProperties';

export default abstract class Extension {
  abstract properties(): Promise<ExtensionProperties>;
}
