import { IButton, IPageHeader } from '../../types/interfaces';
import Button from '../button/button';

class PageHeader implements IPageHeader {
  button: IButton;

  constructor() {
    this.button = new Button('button', 'button');
  }

  render() {
    return (`
      <header class="header">
        ${this.button.render('Garage', 'garageButton')}
        ${this.button.render('Winners', 'winnersButton')}
      </header>
    `);
  }
}

export default PageHeader;
