import { Toggle } from '@/components/Toggle';
import { ConnectKitButton, useSIWE } from 'connectkit';

export default function Home({ address }: { address?: string }) {
  const { data, isSignedIn, signOut, signIn } = useSIWE();
  console.log({ data, isSignedIn, signOut, signIn });
  return (
    <div className="flex  items-center justify-center min-h-screen py-2 flex-col text-center">

      <div className='flex-1 flex-col items-center justify-end flex'>
        <p className="text-[72px] font-bold drop-shadow-3xl flex text-center">RentFi</p>
        <Toggle />
        <p className='text-sm flex mt-3 font-bold'>Log in as Renter</p>
      </div>

      <div className='flex flex-1 flex-col justify-end items-center py-5'>
        <div className='bg-white bg-opacity-30 p-6 rounded-2xl flex'>
          <ConnectKitButton />
        </div>
      </div>
    </div>
  );
}
