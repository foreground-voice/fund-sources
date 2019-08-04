import {NextFunction, Request, RequestHandler, Response} from 'express';

export function jsonBypass(jsonFilePath: string): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(require(jsonFilePath));
    next();
  };
}

export function clone(obj: object): any {
  return JSON.parse(JSON.stringify(obj));
}

export const JSON_DATE_TIMEFORMAT = 'YYYY-MM-DDTHH:mm:ssZZ';
