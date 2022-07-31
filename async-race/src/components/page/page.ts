import View from '../../types/enums';
import PageHeader from './pageHeader';
import PageControls from './pageControls';
import PageContent from './pageContent';
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
    this.content = new PageContent();
  }

  render() {
    this.header.render();
    if (this.view === 'GARAGE') this.controls.render();
    this.content.render();
  }
}

export default Page;
