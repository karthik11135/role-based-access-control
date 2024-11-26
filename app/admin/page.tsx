import React from 'react';
import Profiles from '@/components/profiles/Profiles';
import { verifyAdminAction } from '@/actions/helperActions';
import { redirect } from 'next/navigation';

const page = async () => {
  const isAdmin = await verifyAdminAction();

  if (!isAdmin) {
    return <p className="text-center mt-10">You do not have access to this page</p>
  }

  return (
    <div>
      <h1 className="text-center text-lg mt-10">
        Admins can delete the users and change the role of moderators
      </h1>
      <div className="mx-auto mt-5 w-3/6 border-2 px-6 py-4 rounded-md border-neutral-800 ">
        <Profiles />
      </div>
    </div>
  );
};

export default page;
