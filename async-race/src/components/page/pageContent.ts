import { View } from '../../types/enums';
import {
  IContentBody, IContentHeader, IContentPagination, IPageContent,
} from '../../types/interfaces';
import ContentBody from '../content/contentBody';
import ContentHeader from '../content/contentHeader';
import ContentPagination from '../content/contentPagination';

class PageContent implements IPageContent {
  view: View;

  header: IContentHeader;

  pagination: IContentPagination;

  body: IContentBody;

  constructor(view: View) {
    this.view = view;
    this.header = new ContentHeader(this.view);
    this.pagination = new ContentPagination(1);
    this.body = new ContentBody(this.view);
  }

  async render() {
    return (`
      <section class="content">
        ${this.header.render()}
        ${this.pagination.render()}
        ${await this.body.render()}
      </section>
    `);
  }
}

export default PageContent;
