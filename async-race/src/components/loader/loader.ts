import { ICar, ILoader, ILoaderOptions } from '../../types/interfaces';

class Loader implements ILoader {
  base: string;

  path: string;

  constructor(base: string, path: string) {
    this.base = base;
    this.path = path;
  }

  makeUrl(options?: ILoaderOptions): string {
    let url = `${this.base}${this.path}?`;

    if (options) {
      Object.keys(options).forEach((key) => {
        url += `${key}=${options[key]}&`;
      });
    }

    return url.slice(0, -1);
  }

  async loader(options?: ILoaderOptions): Promise<{ items: ICar[]; count: string | null; }> {
    const response = await fetch(this.makeUrl(options));
    return {
      items: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };
  }
}

export default Loader;
