import { IContentHeader } from '../../types/interfaces';

class ContentHeader implements IContentHeader {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  render(carsCount: string, page: number) {
    return (`
      <header class="content__header">
        <h1>
          ${this.type} (${carsCount})
        </h1>
        <h3>
          Page #${page}
        </h3>     
      </header>
    `);
  }
}

export default ContentHeader;
