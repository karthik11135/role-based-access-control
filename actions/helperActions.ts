'use server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { Role } from '@prisma/client';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: number;
    role: Role;
  }
}

export const verifyUserAction = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token) return false;

  try {
    const decoded = jwt.verify(token.value, 'jwtSecret') as JwtPayload;
    return { id: decoded.id, role: decoded.role };
  } catch (err) {
    return false;
  }
};

export const verifyModeratorAction = async () => {
  const isUser = await verifyUserAction();
  if (!isUser || isUser.role === Role.USER) return false;
  return true;
};

export const verifyAdminAction = async () => {
  const isUser = await verifyUserAction();
  if (!isUser || isUser.role !== Role.ADMIN) return false;
  return true;
};

export const getUserDetails = async ({
  id,
  role,
}: {
  id: number;
  role: Role;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
  return { firstName: user?.firstName, lastName: user?.lastName };
};

export const logoutUser = () => {
  const cookieStore = cookies();
  cookieStore.delete('token');
  redirect('/');
};

export const getAllUsersAndMods = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: {
        not: Role.ADMIN,
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      role: true,
    },
  });

  if (!users) return null;

  return users;
};

export const getOnlyUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: Role.USER,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  if (!users) return null;

  return users;
};

export const deleteUserAction = async (userId: number) => {
  const delUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  if (delUser) {
    revalidatePath('/admin');
    return true;
  }
  return false;
};

export const demoteUserAction = async (userId: number) => {
  const demoteUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: Role.USER,
    },
  });
  if (demoteUser) {
    revalidatePath('/admin');
    return true;
  }
  return false;
};
