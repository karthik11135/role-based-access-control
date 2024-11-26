'use client';
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { loginSchema, loginType } from '@/types/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const [backendError, setBackendError] = useState('');

  const submitHandler: SubmitHandler<loginType> = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/api/login', data);
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
        Login Form
      </h2>
      <p className="text-neutral-300 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Get right in
      </p>

      <form className="mt-6 font-bold" onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div>
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
          {isSubmitting ? 'loading...' : `Login`}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-slate-100 rounded-md h-10 font-medium shadow-input bg-zinc-900 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-300 dark:text-neutral-300" />
            <span className="text-neutral-300 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-slate-200 rounded-md h-10 font-medium shadow-input bg-zinc-900 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-300 dark:text-neutral-300" />
            <span className="text-neutral-300 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-zinc-600 via-cyan-500 to-zinc-600" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex text-slate-200 bg-black flex-col space-y-2 w-full',
        className
      )}
    >
      {children}
    </div>
  );
};
