import {
  IButton, ICar, IGarage, IGetCars,
} from '../../types/interfaces';
import { Path } from '../../types/enums';
import Loader from '../loader/loader';
import environment from '../../environment/environment';
import Button from '../button/button';

class Garage extends Loader implements IGarage {
  button: IButton;

  buttonEngine: IButton;

  constructor() {
    super(environment.baseUrl, Path.GARAGE);
    this.button = new Button('button', 'button');
    this.buttonEngine = new Button('button', 'button-engine');
  }

  async getCars(
    page = environment.initialPage,
    limit = environment.pageLimit.garage,
  ): Promise<IGetCars | string> {
    try {
    // Have no idea how to deal with this 'undefined' argument
      const response = await super.getResponse(undefined, { _page: page, _limit: limit });
      return {
        items: response.json(),
        count: response.headers.get('X-Total-Count'),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return (`
        <div class="error-message">
          <h3>Error: ${errorMessage}!</h3>
        </div>
      `);
    }
  }

  async getCar(id: number): Promise<Response> {
    const response = await super.getResponse(id);
    return response;
  }

  async createCar(name: string, color: string): Promise<Response> {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({ name, color }),
    };
    const response = await super.getResponse(undefined, {}, requestOptions);
    return response;
  }

  async updateCar(id: number, name: string, color: string): Promise<Response> {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'PUT',
      headers: requestHeaders,
      body: JSON.stringify({ name, color }),
    };
    const response = await super.getResponse(id, {}, requestOptions);
    return response;
  }

  async deleteCar(id: number): Promise<Response> {
    const requestOptions = {
      method: 'DELETE',
    };
    const response = await super.getResponse(id, {}, requestOptions);
    return response;
  }

  async render(page?: number) {
    const response = await this.getCars(page);
    if (typeof response === 'string') return response;
    return (await response.items).map((item: ICar) => `
      <div class="car" id=${item.id}>
        <div class="car__header">
          <input type="radio" class="car__radio" id="selectCar${item.id}" name="car">
          <button type="button" class="button button-radio">
            <label for="selectCar${item.id}" class="button__label button-radio">Select</label>
          </button>
          ${this.button.render('Remove', 'deleteCarButton')}
          <h4 class="car__name">${item.name}</h4>
        </div>
        <div class="car__engine">
          ${this.buttonEngine.render('A', `driveCar${item.id}`)}
          ${this.buttonEngine.render('B', `stopCar${item.id}`)}
          <svg viewBox="0 0 176 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M33.489 19.366C25.024 19.366 18.172 26.218 18.172 34.683C18.172 43.148 25.024 50 33.489 50C41.954 50 48.806 43.148 48.806 34.683C48.806 26.218 41.954 19.366 33.489 19.366ZM62.567 7.13238C63.4093 8.94529 64.0802 10.9723 64.5941 13.1707C65.7646 16.8393 64.0374 17.6102 60.0404 16.1113C57.0997 14.3555 54.1591 12.5854 51.2185 10.8296C49.7196 9.77324 49.0059 8.73117 49.2485 7.70337C49.7339 5.67633 53.6452 4.61999 56.8571 3.99189C60.9397 3.17822 60.6542 3.00692 62.567 7.13238ZM141.35 27.5598C137.425 27.5598 134.227 30.7431 134.227 34.683C134.227 38.6086 137.411 41.8062 141.35 41.8062C145.276 41.8062 148.474 38.6229 148.474 34.683C148.474 30.7431 145.29 27.5598 141.35 27.5598ZM33.489 27.5598C29.5634 27.5598 26.3658 30.7431 26.3658 34.683C26.3658 38.6086 29.5491 41.8062 33.489 41.8062C37.4146 41.8062 40.6122 38.6229 40.6122 34.683C40.6122 30.7431 37.4289 27.5598 33.489 27.5598ZM109.546 17.8386C105.592 13.5989 101.024 10.8439 95.742 8.18872C84.1793 2.36455 77.0989 3.07829 64.8225 3.07829L68.9479 13.7845C70.6752 16.0685 72.6309 17.6816 75.6001 17.8386H109.546ZM141.35 19.366C132.885 19.366 126.033 26.218 126.033 34.683C126.033 43.148 132.885 50 141.35 50C149.815 50 156.667 43.148 156.667 34.683C156.667 26.218 149.815 19.366 141.35 19.366ZM117.14 14.6981C112.115 11.5719 106.648 8.77399 100.595 6.39008C82.1665 -0.875862 68.0772 -2.17488 48.7489 3.67784C42.9247 5.89046 37.1006 8.10307 31.2764 9.47346C25.5236 10.8439 0.613831 12.1572 8.80354e-06 16.3397L6.1525 23.6913C3.91134 25.6327 2.08415 28.0166 1.41322 31.7424C1.5988 34.0406 2.2269 35.9677 3.31179 37.5094C5.15326 40.1503 10.5492 42.8768 13.4613 41.3208C14.3891 40.8212 14.9173 39.822 14.903 38.1233C14.8174 4.00616 56.0006 7.88895 52.9029 42.1488H124.763C111.459 7.83185 168.216 7.70337 158.138 40.964C161.678 44.7897 170.029 39.0226 175.41 26.7604C173.94 25.3044 172.327 23.9197 170.528 22.635C170.614 22.5636 170.443 22.9062 170.742 22.3923C171.042 21.8784 170.014 19.7229 167.902 18.4809C156.824 11.9859 130.116 12.1572 117.14 14.6981Z" fill="${item.color}"/>
          </svg>
          <img src="./img/flag.svg" alt="Flag">
        </div>
      </div>
    `).join('');
  }
}

export default Garage;
