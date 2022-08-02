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
  type: string;
  className: string;
  render: (value: string, id?: string) => string;
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
  render: () => void;
}

export interface QueryParams {
  [index: string]: string | number | null;
}

export interface ILoader {
  base: string;
  path: string;
}
