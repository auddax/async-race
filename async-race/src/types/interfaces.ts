import { View } from './enums';

export interface IApp {
  garagePage: IPage;
  winnersPage: IPage;
  page: number;
  root: HTMLElement;
  render: (view: View) => void;
}

export interface IPage {
  view: View;
  header: IPageHeader;
  controls: IPageControls;
  content: IPageContent;
  render: (page: number) => Promise<string>;
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
  body: IContentBody;
  render: (page: number) => Promise<string>;
}

export interface IButton {
  type: string;
  className: string;
  render: (value: string, id?: string) => string;
}

export interface IContentHeader {
  type: string;
  render: (carsCount: string, page: number) => string;
}

export interface IContentFooter {
  button: IButton;
  render: () => string;
}

export interface IContentBody {
  type: string;
  garage: IGarage;
  render: (page: number) => Promise<string>;
}

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface IGarage {
  getCars: (page?: number, limit?: number) => Promise<{
    items: Promise<Response>;
    count: string | null;
  }>;
  createCar: (name: string, color: string) => Promise<Response>;
  updateCar: (id: number, name: string, color: string) => Promise<Response>;
  deleteCar: (id: number) => Promise<Response>;
  render: (page?: number) => void;
}

export interface QueryParams {
  [index: string]: string | number | null;
}

export interface PathVars {
  [index: string]: string | number | null;
}

export interface ILoader {
  base: string;
  path: string;
  makeUrl: (vars?: number, params?: QueryParams) => string;
  loader: (vars?: number, params?: QueryParams, options?: RequestInit) => Promise<Response>;
}
