import { IPageContent } from '../../types/interfaces';

class PageContent implements IPageContent {
  constructor() {
    this.header = new ContentHeader();
  }

  render() {
    return (`
      <section class="content">
        ${header.render()}
      </section>
    `);
  }
}

export default PageContent;
