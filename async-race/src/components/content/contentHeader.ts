class ContentHeader {
  headerText: string;

  constructor(headerText: string) {
    this.headerText = headerText;
  }

  render() {
    return (`
      <h2>
        ${this.headerText}
      </h2>
    `);
  }
}

export default ContentHeader;
