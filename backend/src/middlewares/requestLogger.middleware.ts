import type { Request, Response, NextFunction } from 'express';

const requestLoggerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { method, url, body } = req;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url}`, body);

  next();
};

export default requestLoggerMiddleware;
