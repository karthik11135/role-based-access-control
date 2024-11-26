import Link from 'next/link';
import { verifyUserAction, getUserDetails } from '@/actions/helperActions';

export default async function Home() {
  const res = await verifyUserAction();

  if (!res) {
    return (
      <p className="text-center mt-10">
        Login to see the details{' '}
        <Link href="/login" className="underline text-blue-500">
          login
        </Link>
      </p>
    );
  }

  const getUserName = await getUserDetails(res);

  return (
    <div className="text-center mt-32">
      <h1 className="bg-clip-text mb-10 w-4/6 mx-auto tracking-tight text-transparent from-slate-50 to-slate-800 bg-gradient-to-r font-bold text-6xl font-sans">
        {`Welcome ${getUserName.firstName} ${getUserName.lastName}`}
      </h1>
      <ul className="text-center border px-6 py-4 mx-auto rounded-md border-neutral-800 w-fit text-zinc-300">
        <Link href="/admin" className="p-2 block hover:bg-neutral-900 rounded-md mx-auto tracking-tight w-fit font-bold cursor-pointer">
          Admin Endpoint
        </Link> 
        <Link href="/moderator" className="p-2 block hover:bg-neutral-900 rounded-md mx-auto tracking-tight w-fit font-bold cursor-pointer">
          Moderator Endpoint
        </Link>
      </ul>
    </div>
  );
}
