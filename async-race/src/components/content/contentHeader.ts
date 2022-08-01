import { IContentHeader } from '../../types/interfaces';

class ContentHeader implements IContentHeader {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  render() {
    return (`
      <header class="content__header">
        <h1>
          ${this.type}
        </h1>     
      </header>
    `);
  }
}

export default ContentHeader;
