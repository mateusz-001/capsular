import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

import type { LoginInput, RegisterInput } from '../schemas/auth.schema.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken,
} from '../utils/tokens.js';

export const registerUser = async ({ email, password }: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

  return newUser;
};

export const loginUser = async ({ email, password }: LoginInput) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    throw new Error("User with this e-mail doesn't exist");
  }

  if (!(await bcrypt.compare(password, existingUser.passwordHash))) {
    throw new Error('Password is incorrect');
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  const accessToken = generateAccessToken(existingUser.id, existingUser.email);
  const refreshToken = generateRefreshToken();
  const tokenHash = hashRefreshToken(refreshToken);

  await prisma.authSession.create({
    data: {
      userId: existingUser.id,
      tokenHash,
      expiresAt,
    },
  });

  return {
    accessToken,
    refreshToken,
    email: existingUser.email,
    id: existingUser.id,
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const tokenHash = hashRefreshToken(refreshToken);

  const session = await prisma.authSession.findUnique({
    where: {
      tokenHash,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    throw new Error('Refresh token invalid');
  }

  if (session.revokedAt) {
    throw new Error('Session revoked');
  }

  if (session.expiresAt < new Date()) {
    throw new Error('Refresh token expired');
  }

  await prisma.authSession.update({
    where: {
      id: session.id,
    },
    data: {
      lastUsedAt: new Date(),
    },
  });

  const accessToken = generateAccessToken(session.user.id, session.user.email);

  return {
    accessToken,
  };
};

export const getCurrentUser = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return {
    id: user.id,
    email: user.email,
    status: user.status,
    emailVerified: user.emailVerifiedAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
