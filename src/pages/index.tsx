"use client";

import { Toggle } from "@/components/Toggle";
import useRootStore from "@/store/root";
import { ConnectKitButton, useSIWE } from "connectkit";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
  const { isLoading, data, isSignedIn, signOut, signIn } = useSIWE();
  const [userRole, setUserRole] = useRootStore((state) => [
    state.userRole,
    state.setUserRole,
  ]);
  const router = useRouter();
  console.log("userRole", userRole);

  useEffect(() => {
    if (isSignedIn) {
      console.log("what is the userRole navigating", userRole);
      if (userRole === "renter") {
        console.log("here");
        router.push("/renter/requestLease");
      } else {
        router.push("/landlord");
      }
    }
  }, [userRole, isSignedIn]);

  return (
    <div className="flex  items-center justify-center min-h-screen py-2 flex-col text-center">
      <div className="flex-1 flex-col items-center justify-end flex">
        <Loading isLoading={isLoading}>
          <p className="text-[72px] font-bold drop-shadow-3xl flex text-center">
            RentFi
          </p>
          {!isSignedIn && (
            <Toggle
              toggleState={(state) =>
                setUserRole(state ? "renter" : "landlord")
              }
            />
          )}
          {userRole === "renter" ? (
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
