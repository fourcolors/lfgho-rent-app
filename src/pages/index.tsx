import { Toggle } from "@/components/Toggle";
import useProtectedSIWE from "@/hooks/useProtectedSIWE";
import useRootStore from "@/store/root";
import { ConnectKitButton } from "connectkit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Loading({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <div>Please stand by...</div>;
  } else {
    return <>{children}</>;
  }
}

export default function Home({ address }: { address?: string }) {
  const { isLoading, data, isSignedIn, signOut, signIn } = useProtectedSIWE();
  console.log({ data, isSignedIn, signOut, signIn });
  const [toggled, setToggled] = useState(false);
  const router = useRouter();
  const setLandlord = useRootStore((state) => state.setLandlord);
  const setRenter = useRootStore((state) => state.setRenter);

  // Set useRootStore state when toggle changes and user is logged in
  useEffect(() => {
    if (isSignedIn) {
      router.push("/landlord");
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    if (isSignedIn) {
      if (toggled) {
        setRenter;
        router.push("/renter");
      } else {
        setLandlord;
        router.push("/landlord");
      }
    }
  }, [toggled, setLandlord, setRenter, isSignedIn, router]);

  return (
    <div className="flex  items-center justify-center min-h-screen py-2 flex-col text-center">
      <div className="flex-1 flex-col items-center justify-end flex">
        <Loading isLoading={isLoading}>
          <p className="text-[72px] font-bold drop-shadow-3xl flex text-center">
            RentFi
          </p>
          <Toggle toggleState={(state) => setToggled(state)} />

          {toggled ? (
            <p className="flex text-sm mt-3 font-bold">Log in as Renter</p>
          ) : (
            <p className="flex text-sm mt-3 font-bold ">Log in as Landlord</p>
          )}
        </Loading>
      </div>

      <div className="flex flex-1 flex-col justify-end items-center py-5">
        <div className="bg-white bg-opacity-30 p-6 rounded-2xl flex">
          <ConnectKitButton />
        </div>
      </div>
    </div>
  );
}
