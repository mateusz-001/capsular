import type { Request, Response } from 'express';

import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
import { loginUser, registerUser } from '../services/auth.service.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  const data = registerSchema.parse(req.body);

  const user = await registerUser(data);

  res.status(201).json({
    user,
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const user = loginSchema.parse(req.body);

  const token = await loginUser(user);

  res.status(201).json(token);
};
