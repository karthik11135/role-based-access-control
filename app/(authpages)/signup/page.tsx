import React from 'react';
import { SignupForm } from '@/components/auth/Signup';
import { verifyUserAction } from '@/actions/verifyActions';
import { redirect } from 'next/navigation';

const page = async () => {
  // Verifying a user
  const res = await verifyUserAction();

  if (res) {
    redirect('/');
  }
  
  return <SignupForm />;
};

export default page;
