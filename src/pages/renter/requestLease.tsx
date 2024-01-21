import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";
import { useProtection } from "@/hooks/useProtection";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";

type RequestLeaseArgs = {
  type: "requestLease";
  payload: {
    tenantAddress: string;
    propertyId: string;
  };
};

const requestLease = async ({ type, payload }: RequestLeaseArgs) => {
  const url = "http://localhost:3000/api/backend";
  const { data } = await axios.post(url, { type, payload });
  return data;
};

export default function RequestLease() {
  useProtection();

  const { address } = useAccount();
  const [request, setRequest] = useState(false);
  const [readyToSign, setReadyToSign] = useState(false);
  const router = useRouter();
  const { mutate, data, isLoading, isSuccess } = useMutation({
    mutationFn: requestLease,
    onSuccess: (res) => {
      setRequest(true);
    },
  });

  const buttonText = useMemo(() => {
    if (!request) return "Request Lease";
    if (request && !readyToSign) return "Request Sent";
  }, [readyToSign, request]);

  const variants = {
    tap: {
      scale: request ? 1 : 0.9,
    },
  };

  function handleRequestLease() {
    if (address) {
      mutate({
        type: "requestLease",
        payload: {
          tenantAddress: address,
          propertyId: "1",
        },
      });
    }
  }

  function ActionButton() {
    if (request && readyToSign)
      return (
        <motion.button
          className="bg-yellow-300 py-4 px-5 rounded-xl mt-5 text-black font-bold"
          whileTap="tap"
          variants={variants}
          onClick={() => router.push("/renter/property/1")}
        >
          Sign Lease
        </motion.button>
      );

    return (
      <motion.button
        className="bg-green-500 py-4 px-5 rounded-xl mt-5 data-[request=true]:bg-gray-500"
        whileTap="tap"
        variants={variants}
        onClick={handleRequestLease}
        data-request={request}
        disabled={request}
      >
        {buttonText}
      </motion.button>
    );
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
          <ActionButton />
        </div>
      </MainContent>
      <Footer />
    </div>
  );
}
