import { NotFoundError } from '../errors/NotFoundError.js';
import { prisma } from '../lib/prisma.js';
import type { ProfileInput } from '../schemas/profile.schema.js';
import { removeUndefinedValuesFromPayload } from '../utils/removeUndefinedValuesFromPayload.js';

interface ProfilePayload {
  userId: string;
  data: ProfileInput;
}

export const create = async ({ userId, data }: ProfilePayload) => {
  const payload = removeUndefinedValuesFromPayload({
    userId,
    ...data,
  });

  const profile = await prisma.userProfile.create({
    data: payload as Parameters<typeof prisma.userProfile.create>[0]['data'],
  });

  if (!profile) {
    throw new NotFoundError('User profile not found');
  }

  return profile;
};

export const getProfile = async (userId: string) => {
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    return null;
  }

  return profile;
};

export const getCompletion = async (userId: string) => {
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });

  const totalFields = Object.keys(profile ?? {}).length;
  const filledFields = Object.values(profile ?? {}).filter(Boolean).length;

  const completionRate = (
    totalFields > 0 ? (filledFields / totalFields) * 100 : 0
  ).toFixed(0);

  return {
    completionRate,
  };
};

export const update = async ({ userId, data }: ProfilePayload) => {
  const payload = removeUndefinedValuesFromPayload({
    userId,
    ...data,
  });

  const profile = await prisma.userProfile.update({
    where: {
      userId,
    },
    data: payload as Parameters<typeof prisma.userProfile.update>[0]['data'],
  });

  if (!profile) {
    throw new NotFoundError('User profile not found');
  }

  return profile;
};
