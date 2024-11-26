import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/types/authSchema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userExists } from '../signup/route';

export async function POST(req: NextRequest) {
  const loginData = await req.json();

  const { success } = loginSchema.safeParse(loginData);

  if (!success)
    return NextResponse.json({ message: 'Wrong inputs' }, { status: 401 });

  const user = await userExists(loginData.email);

  if (!user)
    return NextResponse.json(
      { message: 'User doesnt exists' },
      { status: 401 }
    );

  const isPasswordCorrect = await bcrypt.compare(
    loginData.password,
    user.password
  );

  if (!isPasswordCorrect)
    return NextResponse.json(
      { message: 'Passwords are not matching' },
      { status: 401 }
    );

  const jwtToken = jwt.sign({ id: user.id, role: user.role }, 'jwtSecret');

  const response = NextResponse.json({ message: 'Logged in successfully' });

  response.cookies.set('token', jwtToken, {
    httpOnly: true, 
    path: '/', 
    maxAge: 60 * 60 * 24, 
  });

  return response;
}