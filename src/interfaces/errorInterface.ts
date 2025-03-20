export interface ICustomError extends Error {
  status: number;
}

export interface IErrorList {
  [key: string]: string;
}
