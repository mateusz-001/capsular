import type { Request, Response } from 'express';
import {
  create,
  getCompletion,
  getProfile,
  update,
} from '../services/profile.service.js';

export const createProfile = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const data = req.body;

  const profile = await create({ userId, data });

  res
    .status(201)
    .json({ message: 'Profile created successfully', data: profile });
};

export const getProfileInfo = async (req: Request, res: Response) => {
  const { userId } = req.user;

  const profile = await getProfile(userId);

  res.status(200).json({ data: profile });
};

export const getProfileCompletionRate = async (req: Request, res: Response) => {
  const { userId } = req.user;

  const completion = await getCompletion(userId);

  res.status(200).json({ data: completion });
};

export const updateProfileInfo = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const data = req.body;

  const updatedProfile = await update({ userId, data });

  res.status(200).json({
    message: 'Profile updated successfully',
    data: updatedProfile,
  });
};
