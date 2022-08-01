import Page from '../page/page';
import View from '../../types/enums';
import { IApp, IPage } from '../../types/interfaces';

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
    this.root.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.id === 'garageButton') this.root.innerHTML = this.garage.render();
      if (target.id === 'winnersButton') this.root.innerHTML = this.winners.render();
    });
  }

  render(view: View) {
    this.root.innerHTML = this.garage.view === view ? this.garage.render() : this.winners.render();
  }
}

export default App;
