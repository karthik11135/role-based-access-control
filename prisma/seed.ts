import prisma from '../lib/prisma';
import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const names = [
  'John Paul',
  'Mary Jane',
  'James Dean',
  'Anna Grace',
  'Mark Anthony',
  'Emma Rose',
  'Billy Joe',
  'Sarah Beth',
  'Henry James',
  'Ella Mae',
  'Tommy Lee',
  'Martha Ann',
  'William Blake',
  'Lucy Belle',
  'Charlie Ray',
  'Clara Sue',
  'Robert Louis',
  'Katie Lynn',
  'Samuel Jackson',
  'Hannah Marie',
];

const seedDb = () => {
  names.forEach(async (name, ind) => {
    if (ind === 0) {
      await prisma.user.create({
        data: {
          firstName: 'Karthik',
          lastName: 'Rishinarada',
          email: 'admin@gmail.com',
          password: await bcrypt.hash('123456', 10),
          role: Role.ADMIN,
        },
      });

      return;
    }

    await prisma.user.create({
      data: {
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        email:
          ind % 4 === 0 ? `moderator${ind}@gmail.com` : `user${ind}@gmail.com`,
        password: await bcrypt.hash('123456', 10),
        role: ind % 4 === 0 ? Role.MODERATOR : Role.USER,
      },
    });
  });
};

seedDb();
