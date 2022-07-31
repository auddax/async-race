import Page from '../page/page';
import View from '../../types/enums';
import { IApp, IPage } from '../../types/interfaces';

class App implements IApp {
  garage: IPage;

  constructor() {
    this.garage = new Page(View.GARAGE);
  }

  start() {
    this.garage.render();
  }
}

export default App;
