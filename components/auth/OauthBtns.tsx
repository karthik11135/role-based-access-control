import { IconBrandGoogle, IconBrandGithub } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import { BottomGradient } from '../ui/auth-ui';

export const Googlebtn = () => {
  return (
    <button
      onClick={async () => await signIn('google')}
      className=" my-2 relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-slate-200 rounded-md h-10 font-medium shadow-input bg-zinc-900 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
      type="submit"
    >
      <IconBrandGoogle className="h-4 w-4 text-neutral-300 dark:text-neutral-300" />
      <span className="text-neutral-300 dark:text-neutral-300 text-sm">
        Google
      </span>
      <BottomGradient />
    </button>
  );
};

export const GithubBtn = () => {
  return (
    <button
      onClick={async () => await signIn('github')}
      className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-slate-100 rounded-md h-10 font-medium shadow-input bg-zinc-900 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
      type="submit"
    >
      <IconBrandGithub className="h-4 w-4 text-neutral-300 dark:text-neutral-300" />
      <span className="text-neutral-300 dark:text-neutral-300 text-sm">
        GitHub
      </span>
      <BottomGradient />
    </button>
  );
};
