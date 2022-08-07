import PageHeader from './pageHeader';
import PageControls from './pageControls';
import PageContent from './pageContent';
import { EngineStatus, View } from '../../types/enums';
import {
  IDriveRequest,
  IEngine,
  IPage,
  IPageContent,
  IPageControls,
  IPageHeader,
  IWinners,
} from '../../types/interfaces';
import {
  startAnimation,
  generateRandomCarName,
  generateRandomColor,
  showPopup,
} from '../../utils/utils';
import environment from '../../environment/environment';
import Engine from '../garage/engine';

class Page implements IPage {
  view: View;

  page: number;

  root: HTMLElement;

  winners: IWinners;

  engine: IEngine;

  header: IPageHeader;

  controls: IPageControls;

  content: IPageContent;

  driveRequest: IDriveRequest;

  constructor(view: View, page: number, root: HTMLElement, winners: IWinners) {
    this.view = view;
    this.page = page;
    this.root = root;
    this.winners = winners;
    this.engine = new Engine();
    this.header = new PageHeader();
    this.controls = new PageControls();
    this.content = new PageContent(this.view);
    this.driveRequest = {};
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
      this.stopCar(target);
      this.raceCars(target);
      this.resetCars(target);
    });
  }

  async createCar(target: HTMLElement): Promise<void> {
    if (target.id !== 'createCarButton') return;
    const carName = document.getElementById('createCarName') as HTMLInputElement;
    const carColor = document.getElementById('createCarColor') as HTMLInputElement;
    await this.content.body.garage.createCar(carName.value, carColor.value);
    await this.render();
  }

  async deleteCar(target: HTMLElement): Promise<void> {
    if (target.id !== 'deleteCarButton') return;
    const carId = target.parentElement?.parentElement?.id;
    if (carId) await this.content.body.garage.deleteCar(Number(carId));
    await this.render();
  }

  async generateCars(target: HTMLElement): Promise<void> {
    if (target.id !== 'generateCarsButton') return;
    for (let i = 0; i < 100; i += 1) {
      const carName = generateRandomCarName(environment.carBrands, environment.carModels);
      const carColor = generateRandomColor();
      this.content.body.garage.createCar(carName, carColor);
    }
    await this.render();
  }

  async updateCar(target: HTMLElement): Promise<void> {
    if (target.id !== 'updateCarButton') return;
    const targetCar = document.querySelector('input[name="car"]:checked') as HTMLInputElement;
    const carId = targetCar.parentElement?.parentElement?.id;
    const carName = document.getElementById('updateCarName') as HTMLInputElement;
    const carColor = document.getElementById('updateCarColor') as HTMLInputElement;
    await this.content.body.garage.updateCar(Number(carId), carName.value, carColor.value);
    await this.render();
  }

  async raceCars(target: HTMLElement): Promise<IWinners | string | null> {
    if (!target.id.includes('raceCarsButton')) return null;
    const garage = document.querySelectorAll('.car');
    try {
      const winnerCar = await Promise.any(Array.from(garage).map((item) => {
        const car = item.querySelector('svg');
        const carId = item.id;
        return (car && carId) ? this.startEngine(car, carId) : null;
      }));
      // TODO: Refactor this line
      if (winnerCar) {
        Object.assign(this.winners, winnerCar);
        showPopup(winnerCar);
      }
      return winnerCar;
    } catch (error) {
      // TODO: Handle this error
      return error instanceof Error ? error.message : String(error);
    }
  }

  async driveCar(target: Element): Promise<void> {
    if (!target.id.includes('driveCar')) return;
    const carId = target.parentElement?.parentElement?.id;
    const car = target.parentElement?.querySelector('svg');
    if (!car || !carId) return;
    await this.startEngine(car, carId);
  }

  async stopCar(target: HTMLElement): Promise<void> {
    if (!target.id.includes('stopCar')) return;
    const carId = target.parentElement?.parentElement?.id;
    const car = target.parentElement?.querySelector('svg');
    if (!car || !carId || !Object.keys(this.driveRequest).includes(carId)) return;
    await this.engine.controlCarEngine(Number(carId), EngineStatus.STOPPED);
    cancelAnimationFrame(this.driveRequest[carId]);
  }

  async startEngine(car: HTMLElement | SVGSVGElement, carId: string): Promise<IWinners> {
    const responseEngine = await this.engine.controlCarEngine(Number(carId), EngineStatus.STARTED);
    const carElement = document.getElementById(String(carId))?.querySelector('.car__name') as HTMLElement;
    const carName = carElement.innerText;
    const { velocity, distance } = await responseEngine.json();
    const duration = distance / velocity;
    startAnimation(
      car,
      duration,
      carId,
      this.driveRequest,
      (time) => 0.5 * (1 - Math.cos(Math.PI * time)),
    );
    const responseDrive = await this.engine.controlCarEngine(Number(carId), EngineStatus.DRIVE);
    if (responseDrive.status === 500) {
      await this.engine.controlCarEngine(Number(carId), EngineStatus.STOPPED);
      cancelAnimationFrame(this.driveRequest[carId]);
      throw new Error('Engine was broken down!');
    }
    return { [carName]: duration };
  }

  async resetCars(target: HTMLElement): Promise<void> {
    if (target.id !== 'resetCarsButton') return;
    this.driveRequest = {};
    await this.render();
  }

  async nextPage(target: HTMLElement): Promise<void> {
    if (target.id !== 'nextPageButton') return;
    const carCount = (await this.content.body.garage.getCars()).count;
    const pageMax = Math.ceil(Number(carCount) / 7);
    if (this.page + 1 <= pageMax) this.page += 1;
    await this.render();
  }

  async prevPage(target: HTMLElement): Promise<void> {
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
