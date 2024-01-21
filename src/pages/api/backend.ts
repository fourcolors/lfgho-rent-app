import type { NextApiRequest, NextApiResponse } from "next";

export const backendStore = {
  leaseRequests: [],
  signatures: [],
  hash: "",
  addHash: function (hash: string) {
    this.hash = hash;
  },
  addSignature: function (address: string, propertyId: string) {
    this.signatures.push({ address, propertyId });
  },
  addRequest: function (request: { address: string; propertyId: number }) {
    this.leaseRequests.push(request);
  },
  removeRequest: function (propertyId: number) {
    this.leaseRequests = this.leaseRequests.filter(
      (request) => request.propertyId !== propertyId
    );
  },
};

interface RequestPayload {}
interface ApiRequest extends NextApiRequest {
  body: {
    type: string;
    payload: RequestPayload;
  };
}

export default async function handler(
  req: ApiRequest,
  res: NextApiResponse<any>
) {
  const { type, payload } = req.body;
  if (req.method !== "POST") {
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  switch (type) {
    case "requestLease":
      backendStore.addRequest(req.body.payload);
      res.status(200).json({
        message: "Handled requestLease",
        data: { payload: backendStore.leaseRequests },
      });
      break;
    case "type2":
      // Handle request type 2
      res.status(200).json({ message: "Handled type2", data: {} });
      break;
    // Add more cases as needed
    default:
      res.status(400).json({ message: "Unknown request type" });
  }
}
