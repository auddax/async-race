import { IButton, IPageControls } from '../../types/interfaces';
import Button from '../button/button';

class PageControls implements IPageControls {
  button: IButton;

  constructor() {
    this.button = new Button('button', 'button');
  }

  render() {
    return (`
      <section class="controls">
        <form class="controls__form">
          <fieldset class="controls__input-group" id="createCar">
            <input type="text" class="controls__input" id="createCarName" name="createCarName">
            <input type="color" class="controls__input" id="createCarColor" name="createCarColor">
            ${this.button.render('Create', 'createCarButton')}
          </fieldset>
          <fieldset class="controls__input-group" id="updateCar">
            <input type="text" class="controls__input" id="updateCarName" name="updateCarName">
            <input type="color" class="controls__input" id="updateCarColor" name="updateCarColor">
            ${this.button.render('Update', 'updateCarButton')}
          </fieldset>
          <fieldset class="controls__input-group">
            ${this.button.render('Race', 'raceCarsButton')}
            ${this.button.render('Reset', 'resetCarsButton')}
            ${this.button.render('Generate Cars', 'generateCarsButton')}
          </fieldset>
        </form>
      </section>
    `);
  }
}

export default PageControls;
