import { prisma } from '../lib/prisma.js';

export const getColors = async () => {
  const colors = await prisma.color.findMany();

  if (!colors || colors.length === 0) {
    return [];
  }

  return colors;
};

export const getMaterials = async () => {
  const materials = await prisma.material.findMany();

  if (!materials || materials.length === 0) {
    return [];
  }

  return materials;
};
