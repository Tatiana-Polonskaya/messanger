export interface IResponse<T> {
  data?: T;
  code: number;
  info?: string;
}
