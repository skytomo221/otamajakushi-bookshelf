import { ExtensionProperties } from './ExtensionProperties';

export default abstract class Extension {
  public abstract readonly properties: ExtensionProperties;
}
