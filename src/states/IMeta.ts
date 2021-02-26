export default interface IMeta {
  version: number;
  lang: {
    from: string;
    to: string;
  };
  contributors: {
    name: string;
    bio: string;
    urls: {
      name: string;
      url: string;
    }
  };
  dictionary: {
    name: string;
    id: number;
    description: string;
  };
}
