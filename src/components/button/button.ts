import { IButton } from '../../types/interfaces';

class Button implements IButton {
  type: string;

  className: string;

  constructor(type: string, className: string) {
    this.type = type;
    this.className = className;
  }

  render(value: string, id?: string) {
    return (`
      <button type="button" class="${this.className}" id="${id || ''}">
        ${value}
      </button>
    `);
  }
}

export default Button;
