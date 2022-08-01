import { IContentBody } from '../../types/interfaces';

class ContentBody implements IContentBody {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  render() {
    return (`
      <section class=${this.type === 'GARAGE' ? 'list' : 'table'}>
      </section>
    `);
  }
}

export default ContentBody;
