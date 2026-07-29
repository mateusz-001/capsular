import type { Request, Response } from 'express';

import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from '../schemas/auth.schema.js';
import {
  getCurrentUser,
  loginUser,
  refreshAccessToken,
  registerUser,
} from '../services/auth.service.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  const data = registerSchema.parse(req.body);

  const user = await registerUser(data);

  res.status(201).json({
    user,
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const user = loginSchema.parse(req.body);

  const { accessToken, refreshToken, email, id } = await loginUser(user);

  res.status(201).json({
    accessToken,
    refreshToken,
    email,
    id,
  });
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = refreshTokenSchema.parse(req.body);

  const data = await refreshAccessToken(refreshToken);

  res.status(200).json(data);
};

export const me = async (req: Request, res: Response): Promise<void> => {
  const me = await getCurrentUser(req.user.userId);

  res.status(201).json({
    ...me,
  });
};
