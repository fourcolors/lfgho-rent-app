import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";
import { useProtection } from "@/hooks/useProtection";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function RequestLease() {
  useProtection();

  const [request, setRequest] = useState(false);

  const variants = request
    ? {}
    : {
        tap: {
          scale: 0.9,
        },
      };

  function handleClick() {
    setRequest(true);
    // TODO: send request to landlord via the server
  }
  return (
    <div
      className="flex min-h-screen flex-col px-5 space-y-8"
      style={{ height: "100vh" }}
    >
      <MainContent>
        <div className="flex flex-col items-center">
          <p className="text-[72px] font-bold drop-shadow-3xl flex text-center">
            Properties
          </p>
          <div
            key={`property-${1}`}
            style={{ position: "relative", height: "250px", width: "100%" }}
          >
            <Image
              className="rounded"
              alt="house"
              src="/house.jpeg"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <motion.button
            className="bg-green-500 py-4 px-5 rounded-xl mt-5 data-[request=true]:bg-gray-500"
            whileTap="tap"
            variants={variants}
            onClick={handleClick}
            data-request={request}
            disabled={request}
          >
            {request ? "Request Sent" : "Request Lease"}
          </motion.button>
        </div>
      </MainContent>
      <Footer />
    </div>
  );
}
