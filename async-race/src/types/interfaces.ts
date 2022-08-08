import {
  EngineStatus,
  SortOrder,
  SortType,
  View,
} from './enums';

export interface IApp {
  page: number;
  garagePage: IPage;
  winnersPage: IPage;
  render: (view: View) => void;
}

export interface IPage {
  view: View;
  page: number;
  header: IPageHeader;
  controls: IPageControls;
  content: IPageContent;
  driveRequest: IDriveRequest;
  listen: () => void;
  render: () => Promise<void>;
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
  render: (
    page: number,
    sortType: SortType,
    sortOrder: SortOrder
  ) => Promise<string>;
}

export interface IDriveRequest {
  [index: string]: number;
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
  winners: IWinners;
  render: (
    page: number,
    sortType: SortType,
    sortOrder: SortOrder
  ) => Promise<string>;
}

export interface ICar {
  [index: string]: string | number;
}

export interface IGetCars {
  items: Promise<ICar[]>;
  count: string | null;
}

export interface IWinners {
  getWinners: (
    page?: number,
    sort?: SortType,
    order?: SortOrder,
    limit?: number,
  ) => Promise<IGetCars>;
  getWinner: (id: number) => Promise<Response>;
  createWinner: (winnerCar: ICar) => Promise<Response>;
  updateWinner: (winnerCar: ICar) => Promise<Response>;
  deleteWinner: (id: number) => Promise<Response>;
  render: (page?: number, sort?: SortType, order?: SortOrder) => Promise<string>;
}

export interface IGarage {
  getCars: (page?: number, limit?: number) => Promise<IGetCars>;
  createCar: (name: string, color: string) => Promise<Response>;
  updateCar: (id: number, name: string, color: string) => Promise<Response>;
  deleteCar: (id: number) => Promise<Response>;
  render: (page?: number) => Promise<string>;
}

export interface IEngine {
  controlCarEngine: (id: number, status: EngineStatus) => Promise<Response>;
}

export interface RequestParams {
  [index: string]: string | number | null;
}

export interface ILoader {
  base: string;
  path: string;
  makeUrl: (vars?: number, params?: RequestParams) => string;
  getResponse: (vars?: number, params?: RequestParams, options?: RequestInit) => Promise<Response>;
}
