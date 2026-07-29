import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { env } from '../config/env.js';

export const generateAccessToken = (userId: string, email: string) => {
  return jwt.sign(
    {
      userId,
      email,
    },
    env.data.JWT_SECRET,
    {
      expiresIn: env.data.JWT_ACCESS_EXPIRES_IN,
    },
  );
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString('hex');
};

export const hashRefreshToken = (refreshToken: string) => {
  return crypto.createHash('sha256').update(refreshToken).digest('hex');
};
