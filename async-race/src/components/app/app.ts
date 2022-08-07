import Page from '../page/page';
import { IApp, IPage, IWinners } from '../../types/interfaces';
import { View } from '../../types/enums';
import environment from '../../environment/environment';

class App implements IApp {
  root: HTMLElement;

  page: number;

  winners: IWinners;

  garagePage: IPage;

  winnersPage: IPage;

  constructor() {
    this.root = document.getElementById('root') as HTMLElement;
    this.page = environment.initialPage;
    this.winners = {};
    this.garagePage = new Page(View.GARAGE, this.page, this.root, this.winners);
    this.winnersPage = new Page(View.WINNERS, this.page, this.root, this.winners);
  }

  listen(): void {
    this.root.addEventListener('click', async (event) => {
      const target = event.target as HTMLElement;
      if (target.id === 'garagePageButton') this.render(View.GARAGE);
      if (target.id === 'winnersPageButton') this.render(View.WINNERS);
    });
  }

  async render(view: View): Promise<void> {
    if (this.garagePage.view === view) {
      await this.garagePage.render();
      this.garagePage.listen();
    } else {
      await this.winnersPage.render();
      this.winnersPage.listen();
    }
  }
}

export default App;
