'use client';
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { signupType, signupSchema } from '@/types/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { GithubBtn, Googlebtn } from './OauthBtns';
import { BottomGradient, LabelInputContainer } from '../ui/auth-ui';

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<signupType>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();
  const [backendError, setBackendError] = useState<string | boolean>('');

  const submitHandler: SubmitHandler<signupType> = async (data) => {
    try {
      const res = await axios.post(`/api/signup`, data);

      if (res) {
        router.refresh();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setBackendError(err.response?.data.message);
      } else {
        setBackendError('Something went wrong');
      }
    }
  };

  return (
    <div className="max-w-md mt-10 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-6 shadow-input bg-black border border-zinc-800 ">
      <h2 className="font-bold text-xl text-neutral-200 dark:text-neutral-200">
        Signup Form
      </h2>
      <p className="text-neutral-300 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Welcom welcome welcome
      </p>

      <form className="mt-6 font-bold" onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              className="bg-black border text-slate-200 border-neutral-800"
              {...register('firstName')}
              id="firstname"
              placeholder="Tyler"
              type="text"
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              className="bg-black border text-slate-200 border-neutral-800"
              {...register('lastName')}
              id="lastname"
              placeholder="Durden"
              type="text"
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            className="bg-black border text-slate-200 border-neutral-800"
            {...register('email')}
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            className="bg-black text-slate-200 border border-neutral-800"
            {...register('password')}
            id="password"
            placeholder="••••••••"
            type="password"
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </LabelInputContainer>

        <p className="text-sm  mb-3 font-medium text-red-700">{backendError}</p>

        <button
          disabled={isSubmitting}
          className="bg-gradient-to-br relative group/btn from-zinc-900 dark:from-zinc-900 dark:to-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {isSubmitting ? 'loading...' : `Sign up`}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4"></div>
      </form>
      <Googlebtn />
      <GithubBtn />
    </div>
  );
}
