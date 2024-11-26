import { getAllUsersAndMods } from '@/actions/helperActions';
import React from 'react';
import { Role } from '@prisma/client';
import AdminBtns from './adminBtns';

const Profiles = async () => {
  const users = await getAllUsersAndMods();

  if (!users) return null;

  return (
    <div>
      {users.map((user, ind) => {
        return (
          <div
            className="w-full border p-3 border-neutral-700 rounded my-2 text-lg flex"
            key={ind}
          >
            <div>{`${user.firstName} ${user.lastName}`}</div>
            <div className="ms-auto flex gap-3">
              <AdminBtns user={user} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profiles;
