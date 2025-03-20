import { ICustomError, IErrorList } from "../interfaces/errorInterface";

const errorList: IErrorList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status: number, message: string = errorList[status]) => {
  const error = new Error(message) as ICustomError;
  error.status = status;
  return error;
};

export default HttpError;
