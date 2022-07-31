import { IButton, IPageHeader } from '../../types/interfaces';
import Button from '../button/button';

class PageHeader implements IPageHeader {
  buttonGarage: IButton;

  buttonWinners: IButton;

  constructor() {
    this.buttonGarage = new Button('Garage', 'button', 'garageButton');
    this.buttonWinners = new Button('Winners', 'button', 'winnersButton');
  }

  render() {
    return (`
      <header class="header">
        ${this.buttonGarage.render()}
        ${this.buttonWinners.render()}
      </header>
    `);
  }
}

export default PageHeader;
