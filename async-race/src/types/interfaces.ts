import View from './enums';

export interface IApp {
  garage: IPage;
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
