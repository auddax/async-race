import { IButton, IPageControls } from '../../types/interfaces';
import Button from '../button/button';

class PageControls implements IPageControls {
  buttonCreate: IButton;

  buttonUpdate: IButton;

  buttonRace: IButton;

  buttonReset: IButton;

  buttonGenerate: IButton;

  constructor() {
    this.buttonCreate = new Button('Create', 'button', 'createButton');
    this.buttonUpdate = new Button('Update', 'button', 'updateButton');
    this.buttonRace = new Button('Race', 'button', 'raceButton');
    this.buttonReset = new Button('Reset', 'button', 'resetButton');
    this.buttonGenerate = new Button('Generate Cars', 'button', 'generateButton');
  }

  render() {
    return (`
      <section class="controls">
        <form>
          <fieldset>
            <input type="text" id="carName" name="carName">
            <input type="color" id="carColor" name="carColor">
            ${this.buttonCreate.render()}
          </fieldset>
          <fieldset>
            <input type="text" id="carName" name="carName">
            <input type="color" id="carColor" name="carColor">
            ${this.buttonUpdate.render()}
          </fieldset>
          ${this.buttonRace.render()}
          ${this.buttonReset.render()}
          ${this.buttonGenerate.render()}
        </form>
      </section>
    `);
  }
}

export default PageControls;
