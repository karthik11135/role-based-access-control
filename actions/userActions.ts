'use server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { Role } from '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// USER SERVER ACTIONS

// get the details of users
export const getUserDetails = async ({ id }: { id: number }) => {
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

export const userExists = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) return false;
  return user;
};
