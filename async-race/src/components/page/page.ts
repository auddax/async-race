import PageHeader from './pageHeader';
import PageControls from './pageControls';
import PageContent from './pageContent';
import { View } from '../../types/enums';
import {
  IPage, IPageContent, IPageControls, IPageHeader,
} from '../../types/interfaces';
import { generateRandomCarName, generateRandomColor } from '../../utils/utils';
import environment from '../../environment/environment';

class Page implements IPage {
  view: View;

  page: number;

  root: HTMLElement;

  header: IPageHeader;

  controls: IPageControls;

  content: IPageContent;

  constructor(view: View, page: number, root: HTMLElement) {
    this.view = view;
    this.page = page;
    this.root = root;
    this.header = new PageHeader();
    this.controls = new PageControls();
    this.content = new PageContent(this.view);
  }

  listen(): void {
    this.root.addEventListener('click', async (event) => {
      const target = event.target as HTMLElement;
      if (target.id === 'createCarButton') {
        const carName = document.getElementById('createCarName') as HTMLInputElement;
        const carColor = document.getElementById('createCarColor') as HTMLInputElement;
        await this.content.body.garage.createCar(carName.value, carColor.value);
        await this.render();
      }
      if (target.id === 'deleteCarButton') {
        const carId = target.parentElement?.id;
        if (carId) await this.content.body.garage.deleteCar(Number(carId));
        await this.render();
      }
      if (target.id === 'generateCarsButton') {
        for (let i = 0; i < 100; i += 1) {
          const carName = generateRandomCarName(environment.carBrands, environment.carModels);
          const carColor = generateRandomColor();
          this.content.body.garage.createCar(carName, carColor);
        }
        await this.render();
      }
      if (target.id === 'updateCarButton') {
        const targetCar = document.querySelector('input[name="car"]:checked') as HTMLInputElement;
        const carId = targetCar.parentElement?.id;
        const carName = document.getElementById('updateCarName') as HTMLInputElement;
        const carColor = document.getElementById('updateCarColor') as HTMLInputElement;
        await this.content.body.garage.updateCar(Number(carId), carName.value, carColor.value);
        await this.render();
      }
      if (target.id === 'nextPageButton') {
        const carCount = (await this.content.body.garage.getCars()).count;
        const pageMax = Math.ceil(Number(carCount) / 7);
        if (this.page + 1 <= pageMax) this.page += 1; await this.render();
      }
      if (target.id === 'prevPageButton') {
        if (this.page - 1 > 0) this.page -= 1; await this.render();
      }
    });
  }

  async render(): Promise<void> {
    this.root.innerHTML = `
      <div id="${this.view}">
        ${this.header.render()}
        <main>
          ${this.view === 'garage' ? this.controls.render() : ''}
          ${await this.content.render(this.page)}
        </main>
      </div>
    `;
  }
}

export default Page;
