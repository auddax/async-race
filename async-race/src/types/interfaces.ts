import View from './enums';

export interface IApp {
  garage: IPage;
}

export interface IPage {
  view: View;
  render: () => void;
}

export interface IPageHeader {
  render: () => void;
}

export interface IPageControls {
  render: () => void;
}

export interface IPageContent {
  render: () => void;
}
