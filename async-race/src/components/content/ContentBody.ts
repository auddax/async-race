import { IContentBody, IGarage } from '../../types/interfaces';
import Garage from '../garage/garage';

class ContentBody implements IContentBody {
  type: string;

  garage: IGarage;

  constructor(type: string) {
    this.type = type;
    this.garage = new Garage();
  }

  async render(page: number) {
    return (`
      <section class=${this.type}>
        ${this.type === 'garage' ? await this.garage.render(page) : ''}
      </section>
    `);
  }
}

export default ContentBody;
