import { IGarage, ILoaderOptions } from '../../types/interfaces';
import { Path } from '../../types/enums';
import Loader from '../loader/loader';
import environment from '../../environment/environment';

class Garage extends Loader implements IGarage {
  constructor() {
    super(environment.base, Path.GARAGE);
  }

  async getCars(options?: ILoaderOptions) {
    const response = await super.loader(options);
    return response;
  }

  async render() {
    return (await this.getCars()).items.map((item) => `
      <h4>Model: ${item.name}</h4>
    `).join('');
  }
}

export default Garage;
