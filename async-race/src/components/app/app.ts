import Page from '../page/page';
import { IApp, IPage } from '../../types/interfaces';
import { View } from '../../types/enums';
import { generateRandomCarName, generateRandomColor } from '../../utils/utils';
import environment from '../../environment/environment';

class App implements IApp {
  garagePage: IPage;

  winnersPage: IPage;

  page: number;

  root: HTMLElement;

  constructor() {
    this.garagePage = new Page(View.GARAGE);
    this.winnersPage = new Page(View.WINNERS);
    this.page = environment.initialPage;
    this.root = document.getElementById('root') as HTMLElement;
  }

  listen() {
    this.root.addEventListener('click', async (event) => {
      const target = event.target as HTMLElement;
      if (target.id === 'garagePageButton') this.render(View.GARAGE);
      if (target.id === 'winnersPageButton') this.render(View.WINNERS);
      if (target.id === 'createCarButton') {
        const carName = document.getElementById('createCarName') as HTMLInputElement;
        const carColor = document.getElementById('createCarColor') as HTMLInputElement;
        this.garagePage.content.body.garage.createCar(carName.value, carColor.value);
        this.render(View.GARAGE);
      }
      if (target.id === 'deleteCarButton') {
        const carId = target.parentElement?.id;
        if (carId) this.garagePage.content.body.garage.deleteCar(Number(carId));
        this.render(View.GARAGE);
      }
      if (target.id === 'generateCarsButton') {
        for (let i = 0; i < 100; i += 1) {
          const carName = generateRandomCarName(environment.carBrands, environment.carModels);
          const carColor = generateRandomColor();
          this.garagePage.content.body.garage.createCar(carName, carColor);
        }
        this.render(View.GARAGE);
      }
      if (target.id === 'updateCarButton') {
        const targetCar = document.querySelector('input[name="car"]:checked') as HTMLInputElement;
        const carId = targetCar.parentElement?.id;
        const carName = document.getElementById('updateCarName') as HTMLInputElement;
        const carColor = document.getElementById('updateCarColor') as HTMLInputElement;
        this.garagePage.content.body.garage.updateCar(Number(carId), carName.value, carColor.value);
        this.render(View.GARAGE);
      }
      if (target.id === 'nextPageButton') {
        this.page += 1;
        this.render(View.GARAGE);
      }
    });
  }

  async render(view: View): Promise<void> {
    if (this.garagePage.view === view) {
      this.root.innerHTML = await this.garagePage.render(this.page);
    } else {
      this.root.innerHTML = await this.winnersPage.render(this.page);
    }
  }
}

export default App;
