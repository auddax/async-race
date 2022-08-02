import { IContentBody } from '../../types/interfaces';
import Garage from '../garage/garage';

class ContentBody implements IContentBody {
  type: string;

  garage: Garage;

  constructor(type: string) {
    this.type = type;
    this.garage = new Garage();
  }

  async render() {
    return (`
      <section class=${this.type}>
        ${await this.garage.render()}
      </section>
    `);
  }
}

export default ContentBody;
