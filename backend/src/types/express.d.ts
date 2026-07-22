import type { JwtPayload } from './auth.d.ts';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export {};
