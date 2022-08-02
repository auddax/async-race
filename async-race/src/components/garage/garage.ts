import { ICar, IGarage } from '../../types/interfaces';
import { Path } from '../../types/enums';
import Loader from '../loader/loader';
import environment from '../../environment/environment';

class Garage extends Loader implements IGarage {
  constructor() {
    super(environment.base, Path.GARAGE);
  }

  async getCars(page = 1, limit = 7) {
    const response = await super.loader({ _page: page, _limit: limit });
    return response.json();
  }

  async getCar(id: number) {
    const response = await super.loader({ id });
    return response;
  }

  async createCar(name: string, color: string) {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({ name, color }),
    };

    const response = await super.loader({}, requestOptions);
    return response;
  }

  async updateCar(id: number, name: string, color: string) {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'PUT',
      headers: requestHeaders,
      body: JSON.stringify({ name, color }),
    };

    const response = await super.loader({ id }, requestOptions);
    return response;
  }

  async deleteCar(id: number) {
    const requestOptions = {
      method: 'DELETE',
    };

    const response = await super.loader({ id }, requestOptions);
    return response;
  }

  // this.buttonCreate = new Button('Create', 'button', 'createButton');
  // this.buttonUpdate = new Button('Update', 'button', 'updateButton');

  async render() {
    return (await this.getCars()).map((item: ICar) => `
      <h4>Model: ${item.name}</h4>
    `).join('');
  }
}

export default Garage;
