import { getOnlyUsers, verifyModeratorAction } from '@/actions/helperActions';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  const isMod = await verifyModeratorAction();

  if (!isMod) {
    return (
      <p className="text-center mt-10">You do not have access to this page</p>
    );
  }

  const users = await getOnlyUsers();

  if (!users) return null;

  return (
    <div>
      <h1 className="text-center text-lg mt-10">
        Moderators can view all the users
      </h1>
      <div>
        {users.map((user, ind) => {
          return (
            <div
              className="w-3/6 mx-auto  border p-3 border-neutral-700 rounded my-2 text-lg flex"
              key={ind}
            >
              <div>{`${user.firstName} ${user.lastName}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
