// pages/api/landlord.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Address } from "viem";
import abi from "../../abis/lease";
import { account, publicClient, walletClient } from "../../utils/walletClient";

interface Data {
  hash: string | undefined;
}

type ContractArguments = [
  Address, // landlord
  Address, // tenant
  bigint, // rentAmount
  bigint, // dueDate
  bigint, // lateFee
  bigint, // securityDeposit
  bigint, // securityDepositDueDate
  bigint, // leaseDuration
  string, // leasingAgreementId
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { type, payload } = req.body;

  const landlordAddress = payload.landlordAddress as Address;
  const tenantAddress = payload.tenantAddress as Address;

  let hash;
  // const contractTransactionHash = backendStore.hash as Address;
  const contractTransactionHash =
    "0xb46710d5a9f3e3ba4dd70d552270cbb6738174c1eeef9bb6479f64d80605aef4";
  try {
    console.log("Getting contract transaction", contractTransactionHash);
    const transaction = await publicClient.getTransaction({
      hash: contractTransactionHash,
    });

    console.log("transaction", transaction);

    const contractAddress = transaction.to as Address;

    console.log("Finalizing contract", contractAddress);

    const { request } = await publicClient.simulateContract({
      account,
      address: contractAddress,
      abi,
      functionName: "finalizeLeasingAgreement",
      args: [
        landlordAddress,
        tenantAddress,
        BigInt(1),
        BigInt(20),
        BigInt(300),
        BigInt(2),
        BigInt(500),
        BigInt(600),
        "123",
      ],
    });

    console.log("breaks here");

    hash = await walletClient.writeContract(request);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ hash: undefined });
  }
}
