import Page from '../page/page';
import { IApp, IPage } from '../../types/interfaces';
import { View } from '../../types/enums';
import environment from '../../environment/environment';

class App implements IApp {
  page: number;

  garagePage: IPage;

  winnersPage: IPage;

  constructor() {
    this.page = environment.initialPage;
    this.garagePage = new Page(View.GARAGE, this.page);
    this.winnersPage = new Page(View.WINNERS, this.page);
  }

  listen(): void {
    const root = document.getElementById('root') as HTMLElement;
    root.addEventListener('click', async (event) => {
      const target = event.target as HTMLElement;
      if (target.id === 'garagePageButton') this.render(View.GARAGE);
      if (target.id === 'winnersPageButton') this.render(View.WINNERS);
    });
  }

  async render(view: View): Promise<void> {
    if (this.garagePage.view === view) {
      await this.garagePage.render();
    } else {
      await this.winnersPage.render();
    }
  }
}

export default App;
