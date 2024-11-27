'use client';
import React from 'react';

import { logoutUser } from '@/actions/userActions';

const LogoutBtn = () => {
  
  return (
    <button
      onClick={() => logoutUser()}
      className="px-2.5 py-0.5 hover:bg-zinc-900 rounded-md"
    >
      Log out
    </button>
  );
};

export default LogoutBtn;
