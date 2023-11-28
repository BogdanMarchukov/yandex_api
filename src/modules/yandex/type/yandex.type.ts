export enum HttpMethod {
  Post = 'post',
  Get = 'get',
}

export interface IamToken {
  iamToken: string;
  expiresAt: string;
}
