import { createPublicClient, createWalletClient, http } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

export const account = mnemonicToAccount(
  "negative meadow filter shift sure brave antenna sort divorce memory fluid distance"
);

export const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(
    "https://eth-sepolia.g.alchemy.com/v2/gaGMpDrslRDdrzEX64k5EyKWDl2JcMtR"
  ),
});

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(
    "https://eth-sepolia.g.alchemy.com/v2/gaGMpDrslRDdrzEX64k5EyKWDl2JcMtR"
  ),
});
