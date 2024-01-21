import leaseAbi from "@/abis/lease";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";
import { useProtection } from "@/hooks/useProtection";
import { contractAddress } from "@/utils";
import { useRouter } from "next/router";
import {
  Address,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
const leaseAgreement = `LEASE AGREEMENT

This Lease Agreement (the “Agreement”) is made and entered into this [Date], by and between [Landlord's Full Name] ("Landlord") and [Tenant's Full Name(s)] ("Tenant").

1. Premises: Landlord hereby leases to Tenant the property located at [Property Address], (the “Premises”).

2. Term: The term of this lease is for [Lease Duration, e.g., 12 months], beginning on [Start Date] and ending on [End Date].

3. Rent: Tenant agrees to pay a monthly rent of $[Rent Amount] due on the first day of each month. Rent shall be paid to the Landlord at [Landlord's Address or Designated Payment Location].

4. Security Deposit: Upon execution of this Agreement, Tenant shall deposit with Landlord the sum of $[Deposit Amount] as a security deposit. This deposit will be returned to Tenant upon termination of the lease, less any deductions for damages or unpaid rent.

5. Use of Premises: Tenant shall only use the Premises for residential purposes.

6. Maintenance and Repairs: Tenant shall maintain the Premises in a clean and sanitary condition and shall immediately report any damage or need for repairs to the Landlord.

7. Alterations: Tenant shall not make any alterations, additions, or improvements to the Premises without the prior written consent of the Landlord.

8. Utilities: Tenant is responsible for payment of all utilities associated with the Premises, including but not limited to electricity, gas, water, sewer, trash collection, and internet service, unless otherwise agreed in writing.

9. Access by Landlord: Landlord shall have the right to enter the Premises during reasonable hours to inspect, make repairs, or show the Premises to prospective tenants or buyers, after giving Tenant reasonable notice.

10. Subletting and Assignment: Tenant shall not sublet any part of the Premises or assign this Agreement without the prior written consent of the Landlord.

11. Default and Termination: If Tenant fails to comply with any of the financial or material provisions of this Agreement, or of any present rules and regulations or any that may be hereafter prescribed by Landlord, or materially fails to comply with any duties imposed by statute or common law, Tenant will be in default of this Agreement. Then, Landlord may terminate this Agreement upon providing appropriate notice to Tenant.

12. Governing Law: This Agreement shall be governed by, and construed in accordance with, the laws of the State of [State].

13. Entire Agreement: This Agreement constitutes the entire agreement between the parties and supersedes any prior understanding or representation of any kind preceding the date of this Agreement. There are no other promises, conditions, understandings or other agreements, whether oral or written, relating to the subject matter of this Agreement.`;

// Array of arguments to pass to the contract function
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

function RenterProperty() {
  useProtection();

  const { address } = useAccount();
  const router = useRouter();
  const landlordAdress = "0xF6EF9cF4740a54f3B01de673CEBE8D77e34015fd";
  const args: ContractArguments = [
    landlordAdress,
    address ?? "0x000",
    BigInt(500),
    BigInt(123),
    BigInt(100),
    BigInt(1000),
    BigInt(123),
    BigInt(365),
    "42",
  ];

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    functionName: "finalizeLeasingAgreement",
    abi: leaseAbi,
    args,
  });

  const { write, data, isLoading, isSuccess } = useContractWrite(config);

  function handleLeaseSetup() {
    if (write) {
      write();
    }
  }

  return (
    <div
      className="flex min-h-screen flex-col px-5 space-y-8 overflow-auto"
      style={{ height: "100vh" }}
    >
      <MainContent>
        <div className="flex justify-center flex-col items-center">
          <button onClick={() => router.back()} className="p-6 font-bold">
            ← Back
          </button>
          <p className="text-[72px] font-bold drop-shadow-3xl flex text-center">
            Property
          </p>
          <p className="mb-3">123 Main St, San Francisco, CA 94105</p>
        </div>
        <textarea
          value={leaseAgreement}
          readOnly
          className="overflow-auto w-full h-96 p-4 border border-gray-300 rounded text-black"
        />

        <button
          disabled={isLoading}
          onClick={handleLeaseSetup}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          {isLoading ? "Processing..." : "Sign with wallet"}
        </button>
      </MainContent>
      <Footer />
    </div>
  );
}

export default RenterProperty;
