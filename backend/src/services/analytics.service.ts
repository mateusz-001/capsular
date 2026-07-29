import { prisma } from '../lib/prisma.js';
import { getCompletion } from './profile.service.js';

export const wardrobeAnalytics = async (userId: string) => {
  const totalItems = await prisma.wardrobeItem.count({
    where: {
      userId,
      archivedAt: null,
    },
  });

  const itemsByCategory = await prisma.wardrobeItem.groupBy({
    by: ['category'],
    where: {
      userId,
      archivedAt: null,
    },
    _count: true,
  });

  const favoriteItems = await prisma.wardrobeItem.count({
    where: {
      userId,
      archivedAt: null,
      isFavorite: true,
    },
  });

  const availability = await prisma.wardrobeItem.groupBy({
    by: ['availability'],
    where: {
      userId,
      archivedAt: null,
    },
    _count: true,
  });

  return {
    totalItems,
    itemsByCategory,
    favoriteItems,
    availability,
  };
};

export const outfitAnalytics = async (userId: string) => {
  const totalOutfits = await prisma.outfit.count({
    where: {
      userId,
    },
  });

  const favoriteOutfits = await prisma.outfit.count({
    where: {
      userId,
      isFavorite: true,
    },
  });

  const outfitStatusesCount = await prisma.outfit.groupBy({
    by: ['status'],
    where: {
      userId,
    },
    _count: true,
  });

  return {
    totalOutfits,
    favoriteOutfits,
    outfitStatusesCount,
  };
};

export const wearTrackingAnalytics = async (userId: string) => {
  const totalWearEvents = await prisma.wearEvent.count({
    where: {
      userId,
    },
  });

  const lastWearEvent = await prisma.wearEvent.findFirst({
    where: {
      userId,
    },
    orderBy: {
      wornAt: 'desc',
    },
  });

  const mostWornItems = await prisma.wardrobeItem.findMany({
    where: {
      userId,
      archivedAt: null,
    },
    orderBy: {
      wearCount: 'desc',
    },
    take: 5,
  });

  const leastWornItems = await prisma.wardrobeItem.findMany({
    where: {
      userId,
      archivedAt: null,
      wearCount: {
        gt: 0,
      },
    },
    orderBy: {
      wearCount: 'asc',
    },
    take: 5,
  });

  const neverWornItems = await prisma.wardrobeItem.count({
    where: {
      userId,
      archivedAt: null,
      wearCount: 0,
    },
  });

  return {
    totalWearEvents,
    lastWearEvent,
    mostWornItems,
    leastWornItems,
    neverWornItems,
  };
};

export const spendingAnalytics = async (userId: string) => {
  const wardrobeValue = await prisma.wardrobeItem.aggregate({
    where: {
      userId,
      archivedAt: null,
    },
    _sum: {
      purchasePrice: true,
    },
  });

  const averageItemValue = await prisma.wardrobeItem.aggregate({
    where: {
      userId,
      archivedAt: null,
    },
    _avg: {
      purchasePrice: true,
    },
  });

  return {
    wardrobeValue,
    averageItemValue,
  };
};

export const costPerWearAnalytics = async (userId: string) => {
  const costPerWearItems = await prisma.wardrobeItem.findMany({
    where: {
      userId,
      archivedAt: null,
      purchasePrice: {
        not: null,
      },
      wearCount: {
        gt: 0,
      },
    },
    take: 5,
  });

  const costPerWear = costPerWearItems.map((item) => ({
    id: item.id,
    name: item.name,
    purchasePrice: item.purchasePrice,
    wearCount: item.wearCount,
    costPerWear: Number(item.purchasePrice) / item.wearCount,
  }));

  return {
    costPerWear,
  };
};

export const profileAnalytics = async (userId: string) => {
  const completionRate = await getCompletion(userId);
  const capsuleStatus = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
    select: {
      capsuleStatus: true,
    },
  });

  return {
    completionRate,
    capsuleStatus: capsuleStatus?.capsuleStatus || null,
  };
};
