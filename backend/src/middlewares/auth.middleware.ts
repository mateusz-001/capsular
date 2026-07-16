import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

import jwt from 'jsonwebtoken';
import type { JwtPayload } from '../types/auth.js';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'Authorization token is required',
      });
    }

    const token = authHeader?.replace('Bearer ', '');

    const payload = jwt.verify(token, env.data.JWT_SECRET) as JwtPayload;

    req.user = payload;

    next();
  } catch {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};
