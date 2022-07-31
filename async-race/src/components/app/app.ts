import Page from '../page/page';
import View from '../../types/enums';
import { IApp, IPage } from '../../types/interfaces';

class App implements IApp {
  garage: IPage;

  winners: IPage;

  constructor() {
    this.garage = new Page(View.GARAGE);
    this.winners = new Page(View.WINNERS);
  }

  start() {
    const root = document.getElementById('root');
    if (root !== null) root.innerHTML = this.garage.render();
  }
}

export default App;
