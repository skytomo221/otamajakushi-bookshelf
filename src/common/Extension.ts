export default abstract class Extension {
  public abstract readonly name: string;

  public abstract readonly author: string;

  public abstract readonly id: string;

  public abstract readonly version: string;

  public abstract readonly extensionType: 'book-controller' | 'layout-builder';
}
