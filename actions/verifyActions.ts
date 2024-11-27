'use server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { Role } from '@prisma/client';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: number;
    role: Role;
  }
}

export const verifyUserAction = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  const oauthToken = cookieStore.get('authjs.session-token');
  console.log(oauthToken, 'oauthtoken');

  if (!token) return false;

  try {
    const decoded = jwt.verify(token.value, 'jwtSecret') as JwtPayload;
    return { id: decoded.id, role: decoded.role };
  } catch (err) {
    console.log(err);
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
