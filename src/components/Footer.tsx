import { ConnectKitButton } from "connectkit";
import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex flex-col justify-end items-center py-5">
      <div className="bg-white bg-opacity-30 p-6 rounded-2xl flex">
        <ConnectKitButton />
      </div>
    </div>
  );
};

export default Footer;
