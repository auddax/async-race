import { IButton } from '../../types/interfaces';

class Button implements IButton {
  value: string;

  className: string;

  id: string;

  constructor(value: string, className: string, id: string) {
    this.value = value;
    this.className = className;
    this.id = id;
  }

  render() {
    return (`
      <button type="button" class="${this.className}" id="${this.id}">
        ${this.value}
      </button>
    `);
  }
}

export default Button;
