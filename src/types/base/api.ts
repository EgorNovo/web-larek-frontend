export interface IApi {
  baseUrl: string;

  get: (uri:string) => Promise<object>;
  post: (uri: string, data: object, method: string) => Promise<object>;
}