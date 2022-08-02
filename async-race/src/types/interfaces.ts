import { View } from './enums';

export interface IApp {
  garage: IPage;
  winners: IPage;
  root: HTMLElement;
  render: (view: View) => void;
}

export interface IPage {
  view: View;
  render: () => Promise<string>;
}

export interface IPageHeader {
  render: () => string;
}

export interface IPageControls {
  render: () => string;
}

export interface IPageContent {
  view: View;
  header: IContentHeader;
  pagination: IContentPagination;
  body: IContentBody;
  render: () => Promise<string>;
}

export interface IButton {
  value: string;
  render: () => string;
}

export interface IContentHeader {
  type: string;
  render: () => string;
}

export interface IContentPagination {
  render: () => string;
}

export interface IContentBody {
  type: string;
  render: () => Promise<string>;
}

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface IGarage {
  getCars: () => Promise<{ items: ICar[]; count: string | null; }>;
  render: () => void;
}

export interface ILoaderOptions {
  [index: string]: string | null;
}

export interface ILoader {
  base: string;
  path: string;
}
