import React from 'react';
import Link from 'next/link';
import { verifyUserAction } from '@/actions/verifyActions';
import LogoutBtn from './LogoutBtn';

const Navbar = async () => {
  const res = await verifyUserAction();

  return (
    <div className="py-3 border-b justify-around items-center border-neutral-800 flex">
      <Link href="/" className="text-2xl font-medium">
        Assignment
      </Link>
      <div className="flex gap-3 justify-between">
        {!res && (
          <Link
            href="/signup"
            className="px-2.5 py-0.5 hover:bg-zinc-900 rounded-md"
          >
            Sign up
          </Link>
        )}
        {!res && (
          <Link
            href="/login"
            className="px-2.5 py-0.5 hover:bg-zinc-900 rounded-md"
          >
            Log in
          </Link>
        )}
        {res && <LogoutBtn />}
      </div>
    </div>
  );
};

export default Navbar;
