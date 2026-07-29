import type { Request, Response } from 'express';

import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from '../schemas/auth.schema.js';
import {
  getCurrentUser,
  getSessions,
  loginUser,
  logout,
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

  const { accessToken, refreshToken, email, id, userAgent, ipAddress } =
    await loginUser(user, req.get('User-Agent') || '', req.ip || 'Unknown');

  res.status(201).json({
    data: {
      accessToken,
      refreshToken,
      email,
      id,
      userAgent,
      ipAddress,
    },
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

export const getActiveSessions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const sessions = await getSessions(req.user.userId);

  res.status(200).json({
    data: {
      sessions,
    },
  });
};

export const logoutUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { refreshToken } = refreshTokenSchema.parse(req.body);

  await logout(req.user.userId, refreshToken);

  res.status(200).json({
    message: 'Logged out successfully',
  });
};
