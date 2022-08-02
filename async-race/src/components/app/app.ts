import Page from '../page/page';
import { IApp, IPage } from '../../types/interfaces';
import { View } from '../../types/enums';

class App implements IApp {
  garage: IPage;

  winners: IPage;

  root: HTMLElement;

  constructor() {
    this.garage = new Page(View.GARAGE);
    this.winners = new Page(View.WINNERS);
    this.root = document.getElementById('root') as HTMLElement;
  }

  listen() {
    this.root.addEventListener('click', async (event) => {
      const target = event.target as HTMLElement;
      if (target.id === 'garageButton') this.root.innerHTML = await this.garage.render();
      if (target.id === 'winnersButton') this.root.innerHTML = await this.winners.render();
    });
  }

  async render(view: View) {
    if (this.garage.view === view) {
      this.root.innerHTML = await this.garage.render();
    } else {
      this.root.innerHTML = await this.winners.render();
    }
  }
}

export default App;
