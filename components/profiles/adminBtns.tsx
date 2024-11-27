'use client';
import React from 'react';
import { Role } from '@prisma/client';
import { deleteUserAction, demoteUserAction } from '@/actions/userActions';
import { useState } from 'react';

interface userProfile {
  id: number;
  firstName: string;
  lastName: string;
  role: Role;
}

const AdminBtns = ({ user }: { user: userProfile }) => {
  const [delLoading, setDelLoading] = useState(false);
  const [demLoading, setDemLoading] = useState(false);

  const deleteHandler = async (userId: number) => {
    setDelLoading(true);
    const res = await deleteUserAction(userId);
    if (res) {
      setDelLoading(false);
    }
  };

  const demoteHandler = async (userId: number) => {
    setDemLoading(true);
    const res = await demoteUserAction(userId);
    if (res) {
      setDemLoading(false);
    }
  };

  return (
    <>
      <button
        disabled={delLoading}
        onClick={() => deleteHandler(user.id)}
        className="px-3 hover:-translate-y-0.5 transition py-0.5 rounded text-red-800 bg-red-200"
      >
        {delLoading ? 'loading...' : 'Delete'}
      </button>
      {user.role === Role.MODERATOR && (
        <button
          disabled={demLoading}
          onClick={() => demoteHandler(user.id)}
          className="px-3 hover:-translate-y-0.5 transition py-0.5 rounded text-yellow-800 bg-yellow-200"
        >
          {demLoading ? 'loading...' : 'Demote user'}
        </button>
      )}
    </>
  );
};

export default AdminBtns;
