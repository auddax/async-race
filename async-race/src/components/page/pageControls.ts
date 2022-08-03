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
        <form>
          <fieldset id="createCar">
            <input type="text" id="createCarName" name="createCarName">
            <input type="color" id="createCarColor" name="createCarColor">
            ${this.button.render('Create', 'createCarButton')}
          </fieldset>
          <fieldset id="updateCar">
            <input type="text" id="updateCarName" name="updateCarName">
            <input type="color" id="updateCarColor" name="updateCarColor">
            ${this.button.render('Update', 'updateCarButton')}
          </fieldset>
          ${this.button.render('Race', 'raceButton')}
          ${this.button.render('Reset', 'resetButton')}
          ${this.button.render('Generate Cars', 'generateCarsButton')}
        </form>
      </section>
    `);
  }
}

export default PageControls;
