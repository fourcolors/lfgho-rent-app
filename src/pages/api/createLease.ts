// pages/api/landlord.ts
import type { NextApiRequest, NextApiResponse } from "next";
import abi, { bytecode } from "../../abis/lease";
import { account, walletClient } from "../../utils/walletClient";

interface Data {
  hash: string | undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("Deploying contract", account.address);
  let hash;
  try {
    hash = await walletClient.deployContract({
      account,
      abi,
      bytecode,
      args: [account.address],
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ hash: undefined });
  }

  res.status(200).json({ hash: hash });
}
