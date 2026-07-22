import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

import type { LoginInput, RegisterInput } from '../schemas/auth.schema.js';
import { NotFoundError } from '../errors/NotFoundError.js';

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

  const token = jwt.sign(
    {
      userId: existingUser.id,
      email: existingUser.email,
    },
    env.data.JWT_SECRET,
    { expiresIn: '7d' },
  );

  return {
    token,
    email: existingUser.email,
    id: existingUser.id,
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
