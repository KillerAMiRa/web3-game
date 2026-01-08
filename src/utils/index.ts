import { wagmiConfig } from "@/config";
import { waitForTransactionReceipt as waitForTransactionReceiptWagmi } from "wagmi/actions";

export const waitForTransactionReceipt = async (hash: `0x${string}`) => {
  const receipt = await waitForTransactionReceiptWagmi(wagmiConfig, { hash });
  return {
    receipt,
    isConfirmed: receipt.status === "success",
  };
};

import TestToken_ABI from "@/config/contracts/abi/TestToken.json";

export const getTestTokenContract = (chainId: number) => {
  const address = getTestTokenAddress(chainId);
  return {
    address,
    abi: TestToken_ABI,
  };
};

import { Address } from "viem";
import { Chain } from "wagmi/chains";
import { ContractAddresses } from "@/config/contracts/addresses";

export type Addresses = {
  [chainId in Chain["id"]]: Address;
};
export const getAddressFromMap = (
  address: Addresses,
  chainId?: Chain["id"],
): `0x${string}` => {
  return chainId && address[chainId] ? address[chainId] : ("" as `0x${string}`);
};

export const getTestTokenAddress = (chainId: number): `0x${string}` => {
  return getAddressFromMap(ContractAddresses.TestToken as Addresses, chainId);
};
