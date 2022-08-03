import PageHeader from './pageHeader';
import PageControls from './pageControls';
import PageContent from './pageContent';
import { View } from '../../types/enums';
import {
  IPage, IPageContent, IPageControls, IPageHeader,
} from '../../types/interfaces';

class Page implements IPage {
  view: View;

  header: IPageHeader;

  controls: IPageControls;

  content: IPageContent;

  constructor(view: View) {
    this.view = view;
    this.header = new PageHeader();
    this.controls = new PageControls();
    this.content = new PageContent(this.view);
  }

  async render(page: number) {
    return (`
      <div id="${this.view}">
        ${this.header.render()}
        <main>
          ${this.view === 'garage' ? this.controls.render() : ''}
          ${await this.content.render(page)}
        </main>
      </div>
    `);
  }
}

export default Page;
