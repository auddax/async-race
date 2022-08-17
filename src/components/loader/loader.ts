import { ILoader, RequestParams } from '../../types/interfaces';

class Loader implements ILoader {
  base: string;

  path: string;

  constructor(base: string, path: string) {
    this.base = base;
    this.path = path;
  }

  makeUrl(vars?: number, params?: RequestParams): string {
    let url = vars ? `${this.base}${this.path}/${String(vars)}?` : `${this.base}${this.path}?`;
    if (params) {
      Object.keys(params).forEach((key) => {
        url += `${key}=${params[key]}&`;
      });
    }
    return url.slice(0, -1);
  }

  async getResponse(
    vars?: number,
    params?: RequestParams,
    options?: RequestInit,
  ): Promise<Response> {
    const response = await fetch(this.makeUrl(vars, params), options);
    return response;
  }
}

export default Loader;
