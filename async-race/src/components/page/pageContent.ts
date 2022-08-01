import View from '../../types/enums';
import { IContentHeader, IContentPagination, IPageContent } from '../../types/interfaces';
import ContentHeader from '../content/contentHeader';
import ContentPagination from '../content/contentPagination';

class PageContent implements IPageContent {
  view: View;

  header: IContentHeader;

  pagination: IContentPagination;

  constructor(view: View) {
    this.view = view;
    this.header = new ContentHeader(this.view);
    this.pagination = new ContentPagination(1);
  }

  render() {
    return (`
      <section class="content">
        ${this.header.render()}
        ${this.pagination.render()}
      </section>
    `);
  }
}

export default PageContent;
