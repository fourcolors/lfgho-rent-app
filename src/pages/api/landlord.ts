// pages/api/landlord.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { backendStore } from "./backend";

export type Property = {
  id: number;
  name: string;
  status: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyRent: number;
  renterInformation: {
    name: string;
    email: string;
    phone: string;
    ethAddress: string;
  };
};

type Data = {
  properties: Property[];
};

let properties = [
  {
    id: "1",
    name: "123 Main St.",
    status: "onmarket",
    address: "123 Main St.",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    leaseStartDate: "2021-01-01",
    leaseEndDate: "2022-01-01",
    monthlyRent: 6000,
    renterInformation: {
      name: "John Doe",
      email: "example@example.com",
      phone: "123-456-7890",
      ethAddress: "0x1234567890",
    },
  },
  {
    id: "2",
    name: "456 Main St.",
    status: "onmarket",
    address: "456 Main St.",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    leaseStartDate: "2021-01-01",
    leaseEndDate: "2022-01-01",
    monthlyRent: 4000,
    renterInformation: {
      name: "John Doe",
      email: "text@example.com",
      phone: "123-456-7890",
      ethAddress: "0x1234567890",
    },
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const updatedProperties = properties.map((property) => {
    const isPending = backendStore.leaseRequests.some(
      (leaseRequest) => leaseRequest.propertyId === property.id
    );
    return isPending ? { ...property, status: "pending" } : property;
  });

  properties = [...updatedProperties];

  console.log("properties", properties);

  res.status(200).json({ properties });
}
