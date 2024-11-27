import { userExists } from '@/actions/userActions';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

// Using NextAUTH for Oauth login

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  secret: process.env.AUTH_SECRET as string,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // user is stored in the db, whenever oauth login occurs
      const alreadyExists = await userExists(user.email as string);
      if (alreadyExists) return true;

      await prisma.user.create({
        data: {
          firstName: user.name as string,
          lastName: '',
          password: 'randomstring',
          email: user.email as string,
        },
      });

      return true;
    },
    async jwt({ token, user }) {
      if (user && user.email && token) {
        const userFind = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });

        // including id and role of the user in the token
        token.id = userFind?.id;
        token.role = userFind?.role;
      }
      console.log(token, 'jwt');
      return token;
    },
  },
  jwt: {
    encode: async ({ token, secret }) => {
      if (!token) {
        throw new Error('Token is required for encoding.');
      }

      try {
        // signing the token, so that it can be verified in server action
        const encodedToken = jwt.sign(
          token as object,
          process.env.AUTH_SECRET as string
        );
        return encodedToken;
      } catch (error) {
        throw new Error('Failed to encode token.');
      }
    },
  },
  cookies: {
    sessionToken: {
      // setting the name of the cookie variable to token
      name: 'token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      },
    },
  },
});
