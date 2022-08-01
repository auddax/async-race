import { IContentPagination } from '../../types/interfaces';

class ContentPagination implements IContentPagination {
  currentPage: number;

  constructor(currentPage: number) {
    this.currentPage = currentPage;
  }

  render() {
    return (`
        <h3>
          Page ${this.currentPage}
        </h3>     
    `);
  }
}

export default ContentPagination;
