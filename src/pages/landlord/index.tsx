import Footer from "@/components/Footer";
import { useProtection } from "@/hooks/useProtection";
import Image from "next/image";

export default function LandlordHome() {
  useProtection();

  return (
    <div
      className="flex min-h-screen flex-col px-5 space-y-8"
      style={{ height: "100vh" }}
    >
      <div className="flex flex-1 overflow-auto flex-col scroll-m-3 no-scrollbar">
        <div className="flex justify-center flex-col items-center">
          <p className="text-[72px] font-bold drop-shadow-3xl flex text-center">
            Landlord
          </p>

          <div className="bg-white bg-opacity-30 p-6 rounded-2xl flex">
            <div>3 / 4 properties rented</div>
          </div>
        </div>
        <div>
          <p className="text-[42px] font-bold drop-shadow-3xl flex text-center">
            Pending
          </p>
          <div style={{ position: "relative", height: "250px", width: "100%" }}>
            <Image
              className="rounded"
              alt="house"
              src="/house.jpeg"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div>
          <p className="text-[42px] font-bold drop-shadow-3xl flex text-center">
            Leasing
          </p>
          <div style={{ position: "relative", height: "250px", width: "100%" }}>
            <Image
              className="rounded"
              alt="house"
              src="/house.jpeg"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
