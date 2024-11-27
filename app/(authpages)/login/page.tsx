import React from 'react';
import { LoginForm } from '@/components/auth/Login';
import { verifyUserAction } from '@/actions/verifyActions';
import { redirect } from 'next/navigation';

const page = async () => {
  // Verifying a user
  const res = await verifyUserAction();

  if (res) {
    redirect('/');
  }

  return <LoginForm />;
};

export default page;
