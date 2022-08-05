import PageHeader from './pageHeader';
import PageControls from './pageControls';
import PageContent from './pageContent';
import { EngineStatus, View } from '../../types/enums';
import {
  IEngine,
  IPage, IPageContent, IPageControls, IPageHeader,
} from '../../types/interfaces';
import { generateRandomCarName, generateRandomColor } from '../../utils/utils';
import environment from '../../environment/environment';
import Engine from '../garage/engine';

class Page implements IPage {
  view: View;

  page: number;

  root: HTMLElement;

  engine: IEngine;

  header: IPageHeader;

  controls: IPageControls;

  content: IPageContent;

  constructor(view: View, page: number, root: HTMLElement) {
    this.view = view;
    this.page = page;
    this.root = root;
    this.engine = new Engine();
    this.header = new PageHeader();
    this.controls = new PageControls();
    this.content = new PageContent(this.view);
  }

  listen(): void {
    this.root.addEventListener('click', async (event) => {
      const target = event.target as HTMLElement;
      this.createCar(target);
      this.deleteCar(target);
      this.generateCars(target);
      this.updateCar(target);
      this.nextPage(target);
      this.prevPage(target);
      this.driveCar(target);
    });
  }

  async createCar(target: HTMLElement) {
    if (target.id !== 'createCarButton') return;
    const carName = document.getElementById('createCarName') as HTMLInputElement;
    const carColor = document.getElementById('createCarColor') as HTMLInputElement;
    await this.content.body.garage.createCar(carName.value, carColor.value);
    await this.render();
  }

  async deleteCar(target: HTMLElement) {
    if (target.id !== 'deleteCarButton') return;
    const carId = target.parentElement?.parentElement?.id;
    if (carId) await this.content.body.garage.deleteCar(Number(carId));
    await this.render();
  }

  async generateCars(target: HTMLElement) {
    if (target.id !== 'generateCarsButton') return;
    for (let i = 0; i < 100; i += 1) {
      const carName = generateRandomCarName(environment.carBrands, environment.carModels);
      const carColor = generateRandomColor();
      this.content.body.garage.createCar(carName, carColor);
    }
    await this.render();
  }

  async updateCar(target: HTMLElement) {
    if (target.id !== 'updateCarButton') return;
    const targetCar = document.querySelector('input[name="car"]:checked') as HTMLInputElement;
    const carId = targetCar.parentElement?.parentElement?.id;
    const carName = document.getElementById('updateCarName') as HTMLInputElement;
    const carColor = document.getElementById('updateCarColor') as HTMLInputElement;
    await this.content.body.garage.updateCar(Number(carId), carName.value, carColor.value);
    await this.render();
  }

  async driveCar(target: HTMLElement) {
    if (!target.id.includes('driveCar')) return;
    const carId = target.parentElement?.parentElement?.id;
    const car = target.parentElement?.querySelector('svg');
    if (!car) return;
    const response = await this.engine.controlCarEngine(Number(carId), EngineStatus.STARTED);
    const { velocity, distance } = await response.json();
    const time = distance / velocity;
    console.log(time);
  }

  async nextPage(target: HTMLElement) {
    if (target.id !== 'nextPageButton') return;
    const carCount = (await this.content.body.garage.getCars()).count;
    const pageMax = Math.ceil(Number(carCount) / 7);
    if (this.page + 1 <= pageMax) this.page += 1;
    await this.render();
  }

  async prevPage(target: HTMLElement) {
    if (target.id !== 'prevPageButton') return;
    if (this.page - 1 > 0) this.page -= 1;
    await this.render();
  }

  async render(): Promise<void> {
    this.root.innerHTML = `
      <div id="${this.view}">
        ${this.header.render()}
        <main class="container">
          ${this.view === 'garage' ? this.controls.render() : ''}
          ${await this.content.render(this.page)}
        </main>
      </div>
    `;
  }
}

export default Page;
