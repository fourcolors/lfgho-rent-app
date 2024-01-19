import { Toggle } from "@/components/Toggle";
import { ConnectKitButton, useSIWE } from "connectkit";
import { useState } from "react";

export default function Home({ address }: { address?: string }) {
  const { data, isSignedIn, signOut, signIn } = useSIWE();
  console.log({ data, isSignedIn, signOut, signIn });

  const [toggled, setToggled] = useState(false);

  return (
    <div className="flex  items-center justify-center min-h-screen py-2 flex-col text-center">
      <div className="flex-1 flex-col items-center justify-end flex">
        <p className="text-[72px] font-bold drop-shadow-3xl flex text-center">
          RentFi
        </p>
        <Toggle toggleState={(state) => setToggled(state)} />

        {toggled ? (
          <p className="flex text-sm mt-3 font-bold">Log in as Renter</p>
        ) : (
          <p className="flex text-sm mt-3 font-bold ">Log in as Landlord</p>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-end items-center py-5">
        <div className="bg-white bg-opacity-30 p-6 rounded-2xl flex">
          <ConnectKitButton />
        </div>
      </div>
    </div>
  );
}
const scaleAnimation = {
  scale: [1, 2, 1], // Start at normal size, scale up to 1.5x, then back to normal
  transition: {
    duration: 0.5, // Duration for the entire animation sequence
    ease: "easeInOut", // Ease function for the animation
  },
};
