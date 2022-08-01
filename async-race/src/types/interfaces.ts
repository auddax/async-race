import View from './enums';

export interface IApp {
  garage: IPage;
  winners: IPage;
  root: HTMLElement;
  render: (view: View) => void;
}

export interface IPage {
  view: View;
  render: () => string;
}

export interface IPageHeader {
  render: () => string;
}

export interface IPageControls {
  render: () => string;
}

export interface IPageContent {
  render: () => string;
}

export interface IButton {
  value: string;
  render: () => string;
}

export interface IContentHeader {
  headerText: string;
  render: () => string;
}

export interface IContentPagination {
  render: () => string;
}
