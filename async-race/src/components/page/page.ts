import PageHeader from './pageHeader';
import PageControls from './pageControls';
import PageContent from './pageContent';
import {
  EngineStatus,
  SortOrder,
  SortType,
  View,
} from '../../types/enums';
import {
  ICar,
  IDriveRequest,
  IEngine,
  IPage,
  IPageContent,
  IPageControls,
  IPageHeader,
} from '../../types/interfaces';
import {
  startAnimation,
  generateRandomCarName,
  generateRandomColor,
  showPopup,
  resetAnimation,
  checkRadioButton,
} from '../../utils/utils';
import environment from '../../environment/environment';
import Engine from '../garage/engine';

class Page implements IPage {
  view: View;

  page: number;

  sortType: SortType;

  sortOrder: SortOrder;

  engine: IEngine;

  header: IPageHeader;

  controls: IPageControls;

  content: IPageContent;

  driveRequest: IDriveRequest;

  constructor(view: View, page: number) {
    this.view = view;
    this.page = page;
    this.sortType = SortType.TIME;
    this.sortOrder = SortOrder.ASC;
    this.engine = new Engine();
    this.header = new PageHeader();
    this.controls = new PageControls();
    this.content = new PageContent(this.view);
    this.driveRequest = {};
  }

  listen(): void {
    const root = document.getElementById(this.view) as HTMLElement;
    root.addEventListener('click', async (event) => {
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
      this.sortCars(target);
      checkRadioButton(event);
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
    const checkWinner = await this.content.body.winners.getWinner(Number(carId));
    if (checkWinner.status === 200) {
      await this.content.body.winners.deleteWinner(Number(carId));
    }
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

  async raceCars(target: HTMLElement): Promise<ICar | string | null> {
    if (!target.id.includes('raceCarsButton')) return null;
    if (target.classList.contains('active')) return null;
    target.classList.add('active');
    const garage = document.querySelectorAll('.car');
    try {
      const winnerCar = await Promise.any(Array.from(garage).map((item) => {
        const car = item.querySelector('svg');
        const carId = item.id;
        return (car && carId) ? this.startEngine(car, carId) : null;
      }));
      if (winnerCar) {
        await this.content.body.winners.createWinner(winnerCar);
        showPopup(winnerCar);
      }
      return winnerCar;
    } catch (error) {
      return error instanceof Error ? error.message : String(error);
    }
  }

  async driveCar(target: HTMLElement): Promise<void> {
    if (!target.id.includes('driveCar')) return;
    if (target.classList.contains('active')) return;
    const carId = target.parentElement?.parentElement?.id;
    const car = target.parentElement?.querySelector('svg');
    if (!car || !carId) return;
    target.classList.add('active');
    await this.startEngine(car, carId);
  }

  async stopCar(target: HTMLElement): Promise<void> {
    if (!target.id.includes('stopCar')) return;
    const carId = target.parentElement?.parentElement?.id;
    const carDriveButton = document.getElementById(`driveCar${carId}`) as HTMLInputElement;
    const car = target.parentElement?.querySelector('svg');
    if (!car || !carId || !Object.keys(this.driveRequest).includes(carId)) return;
    await this.engine.controlCarEngine(Number(carId), EngineStatus.STOPPED);
    carDriveButton.classList.remove('active');
    cancelAnimationFrame(this.driveRequest[carId]);
    resetAnimation(car);
  }

  async startEngine(car: HTMLElement | SVGSVGElement, carId: string): Promise<ICar> {
    const responseEngine = await this.engine.controlCarEngine(Number(carId), EngineStatus.STARTED);
    const carElement = document.getElementById(String(carId))?.querySelector('.car__name') as HTMLElement;
    const carDriveButton = document.getElementById(`driveCar${carId}`) as HTMLInputElement;
    const carName = carElement.innerText;
    const carColor = car.querySelector('path')?.getAttribute('fill') || environment.defaultColor;
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
      carDriveButton.classList.remove('active');
      throw new Error('Engine was broken down!');
    }
    carDriveButton.classList.remove('active');
    return {
      id: carId,
      time: (duration / 1000).toFixed(2),
      name: carName,
      color: carColor,
    };
  }

  async resetCars(target: HTMLElement): Promise<void> {
    if (target.id !== 'resetCarsButton') return;
    const raceCarsButton = document.getElementById('raceCarsButton') as HTMLElement;
    raceCarsButton.classList.remove('active');
    this.driveRequest = {};
    await this.render();
  }

  async sortCars(target: HTMLElement): Promise<void> {
    if (!(target.id === 'winnersNumberWins' || target.id === 'winnersBestTime')) return;
    if (target.id === 'winnersNumberWins') this.sortType = SortType.WINS;
    if (target.id === 'winnersBestTime') this.sortType = SortType.TIME;
    if (this.sortOrder === SortOrder.ASC) {
      this.sortOrder = SortOrder.DESC;
    } else {
      this.sortOrder = SortOrder.ASC;
    }
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
    if (target.classList.contains('disabled')) return;
    if (this.page - 1 > 0) this.page -= 1;
    if (this.page === 1) target.classList.add('disabled');
    await this.render();
  }

  async render(): Promise<void> {
    const root = document.getElementById('root') as HTMLElement;
    root.innerHTML = `
      <div id="${this.view}">
        ${this.header.render()}
        <main class="container">
          ${this.view === 'garage' ? this.controls.render() : ''}
          ${await this.content.render(this.page, this.sortType, this.sortOrder)}
        </main>
      </div>
    `;
    this.listen();
  }
}

export default Page;
