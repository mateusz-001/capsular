import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';

interface Payload {
  email: string;
  password: string;
}

export const registerUser = async ({ email, password }: Payload) => {
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
