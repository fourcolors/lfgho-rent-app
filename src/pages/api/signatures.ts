// pages/api/landlord.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { backendStore } from "./backend";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ signatures: backendStore.signatures });
}
