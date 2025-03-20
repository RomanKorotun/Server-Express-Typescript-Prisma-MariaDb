import { NextFunction, Request, Response } from "express";

type ICtrlWrapper = (
  ctrl: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => Promise<void>;

const ctrlWrapper: ICtrlWrapper = (ctrl) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

export default ctrlWrapper;
