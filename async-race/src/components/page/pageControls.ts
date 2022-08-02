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
          <fieldset>
            <input type="text" id="carName" name="carName">
            <input type="color" id="carColor" name="carColor">
            ${this.button.render('Create', 'createButton')}
          </fieldset>
          <fieldset>
            <input type="text" id="carName" name="carName">
            <input type="color" id="carColor" name="carColor">
            ${this.button.render('Update', 'updateButton')}
          </fieldset>
          ${this.button.render('Race', 'raceButton')}
          ${this.button.render('Reset', 'resetButton')}
          ${this.button.render('Generate Cars', 'generateButton')}
        </form>
      </section>
    `);
  }
}

export default PageControls;
