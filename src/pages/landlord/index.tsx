"use client";

import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";
import { usePolling } from "@/hooks/usePolling";
import { useProtection } from "@/hooks/useProtection";
import Image from "next/image";
import { useMemo } from "react";
import { Property } from "../api/landlord";

export default function LandlordHome() {
  const { isLoading, isError, data } = usePolling({
    queryKey: ["landloardPage"],
    url: "/api/landlord",
    intervalMs: 5000,
  });

  console.log("isLoading", isLoading);
  console.log("isError", isError);
  console.log("data", data);

  const pendingProperties = useMemo(() => {
    if (!data) return [];
    return data.properties.filter((p: Property) => p.status === "pending");
  }, [data]);

  const leasedProperties = useMemo(() => {
    if (!data) return [];
    return data.properties.filter((p: Property) => p.status === "leased");
  }, [data]);

  useProtection();
  return (
    <div
      className="flex min-h-screen flex-col px-5 space-y-8"
      style={{ height: "100vh" }}
    >
      <MainContent>
        <div className="flex justify-center flex-col items-center">
          <p className="text-[72px] font-bold drop-shadow-3xl flex text-center">
            Landlord
          </p>

          <div className="bg-white bg-opacity-30 p-6 rounded-2xl flex">
            <div>1 / 2 properties leased</div>
          </div>
        </div>
        <div>
          <p className="text-[42px] font-bold drop-shadow-3xl flex text-center">
            Pending
          </p>
          {pendingProperties.map((property: Property, index: string) => (
            <div
              key={`property-${index}`}
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
          ))}
        </div>
        <div>
          <p className="text-[42px] font-bold drop-shadow-3xl flex text-center">
            Leased
          </p>

          {leasedProperties.map((property: Property, index: string) => (
            <div
              key={`leasedProperty-${index}`}
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
          ))}
        </div>
      </MainContent>

      <Footer />
    </div>
  );
}
