import { NextRequest, NextResponse } from 'next/server';
import { signupSchema } from '@/types/authSchema';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const userExists = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) return false;
  return user;
};

export async function POST(req: NextRequest) {
  const signupData = await req.json();
  const { success } = signupSchema.safeParse(signupData);

  if (!success)
    return NextResponse.json({ message: 'Wrong inputs' }, { status: 401 });

  const userAlreadyExists = await userExists(signupData.email);

  if (userAlreadyExists)
    return NextResponse.json({ message: 'User exists' }, { status: 401 });

  const hashedPassword = await bcrypt.hash(signupData.password, 10);
  signupData.password = hashedPassword;

  console.log('hashed password', hashedPassword);
  const userCreated = await prisma.user.create({
    data: signupData,
  });

  console.log('created user', userCreated);

  const jwtToken = jwt.sign(
    { id: userCreated.id, role: userCreated.role },
    'jwtSecret'
  );

  const response = NextResponse.json({ message: 'Logged in successfully' });

  response.cookies.set('token', jwtToken, {
    httpOnly: true, // Secure cookie for HttpOnly access
    path: '/', // Cookie is available throughout the site
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}

export async function GET() {
  return NextResponse.json({ message: true });
}
