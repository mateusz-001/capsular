import {
  costPerWearAnalytics,
  outfitAnalytics,
  profileAnalytics,
  spendingAnalytics,
  wardrobeAnalytics,
  wearTrackingAnalytics,
} from '../services/analytics.service.js';

import type { Request, Response } from 'express';

export const getDashboardAnalytics = async (req: Request, res: Response) => {
  const { userId } = req.user;

  const [
    wardrobe,
    outfitStatuses,
    wearTracking,
    spending,
    costPerWear,
    profile,
  ] = await Promise.all([
    wardrobeAnalytics(userId),
    outfitAnalytics(userId),
    wearTrackingAnalytics(userId),
    spendingAnalytics(userId),
    costPerWearAnalytics(userId),
    profileAnalytics(userId),
  ]);

  res.status(200).json({
    data: {
      wardrobe,
      outfitStatuses,
      wearTracking,
      spending,
      costPerWear,
      profile,
    },
  });
};
