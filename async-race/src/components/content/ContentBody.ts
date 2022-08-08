import { SortOrder, SortType } from '../../types/enums';
import {
  IContentBody,
  IGarage,
  IWinners,
} from '../../types/interfaces';
import Garage from '../garage/garage';
import Winners from '../winners/winners';

class ContentBody implements IContentBody {
  type: string;

  garage: IGarage;

  winners: IWinners;

  constructor(type: string) {
    this.type = type;
    this.garage = new Garage();
    this.winners = new Winners();
  }

  async render(page: number, sortType: SortType, sortOrder: SortOrder):Promise<string> {
    return (`
      <section class=${this.type}>
        ${this.type === 'garage' ? await this.garage.render(page) : await this.winners.render(page, sortType, sortOrder)}
      </section>
    `);
  }
}

export default ContentBody;
