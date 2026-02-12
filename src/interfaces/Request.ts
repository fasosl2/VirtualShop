
export interface ApiGetParams {
  route?: string;
  params?: string[] | Record<string, any>;
  header?: Record<string, string>;
  page?: number;
  baseID?: string;
  [key: string]: any;
}

export interface ApiPutParams {
  route: string;
  body: any;
  params?: string[];
}