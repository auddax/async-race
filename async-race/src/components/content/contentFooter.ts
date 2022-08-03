import { IButton, IContentFooter } from '../../types/interfaces';
import Button from '../button/button';

class ContentFooter implements IContentFooter {
  button: IButton;

  constructor() {
    this.button = new Button('button', 'button');
  }

  render() {
    return (`
      <footer>
        ${this.button.render('Previous', 'prevPageButton')}
        ${this.button.render('Next', 'nextPageButton')}
      </footer>
    `);
  }
}

export default ContentFooter;
