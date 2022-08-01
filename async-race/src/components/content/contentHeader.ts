import { IContentHeader } from '../../types/interfaces';

class ContentHeader implements IContentHeader {
  headerText: string;

  constructor(headerText: string) {
    this.headerText = headerText;
  }

  render() {
    return (`
      <header class="content__header">
        <h1>
          ${this.headerText}
        </h1>     
      </header>
    `);
  }
}

export default ContentHeader;
