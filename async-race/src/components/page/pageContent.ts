import { View } from '../../types/enums';
import {
  IContentBody, IContentFooter, IContentHeader, IPageContent,
} from '../../types/interfaces';
import ContentBody from '../content/contentBody';
import ContentFooter from '../content/contentFooter';
import ContentHeader from '../content/contentHeader';

class PageContent implements IPageContent {
  view: View;

  header: IContentHeader;

  body: IContentBody;

  footer: IContentFooter;

  constructor(view: View) {
    this.view = view;
    this.header = new ContentHeader(this.view);
    this.body = new ContentBody(this.view);
    this.footer = new ContentFooter();
  }

  async render(page: number) {
    const carsCount = await (await this.body.garage.getCars()).count;
    const winnersCount = await (await this.body.winners.getWinners()).count;
    const renderCount = this.view === View.GARAGE ? carsCount : winnersCount;

    return (`
      <section class="content">
        ${this.header.render(renderCount || '0', page)}
        ${await this.body.render(page)}
        ${this.footer.render()}
      </section>
    `);
  }
}

export default PageContent;
