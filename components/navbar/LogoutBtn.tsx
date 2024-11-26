'use client';
import React from 'react';

import { logoutUser } from '@/actions/helperActions';

const LogoutBtn = () => {


  const logoutHandler = () => {
     logoutUser()
  };

  return (
    <button onClick={logoutHandler} className="px-2.5 py-0.5 hover:bg-zinc-900 rounded-md">
      Log out
    </button>
  );
};

export default LogoutBtn;
