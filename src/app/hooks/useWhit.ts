import {
  useChainId,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { getTestTokenContract } from "@/utils/contractHelpers";
import { Abi, Address, BaseError } from "viem";
import { waitForTransactionReceipt } from "@/utils";
import { useState } from "react";

// read example
export const useReadTestTokenContract = (address?: Address) => {
  const chainId = useChainId();

  const contract = getTestTokenContract(chainId);

  const contracts = [
    {
      ...contract,
      functionName: "balanceOf",
      args: [address],
    },
    {
      ...contract,
      functionName: "decimals",
    },
    {
      ...contract,
      functionName: "name",
    },
    {
      ...contract,
      functionName: "symbol",
    },
    {
      ...contract,
      functionName: "totalSupply",
    },
  ];

  const { data, error, isLoading, isError, refetch } = useReadContracts({
    contracts: contracts.map((contract) => ({
      ...contract,
      abi: contract.abi as Abi,
    })),
    query: {
      enabled: !!address,
    },
  });

  const [
    balanceOfAddress = BigInt(0),
    decimals = 0,
    name = "",
    symbol = "",
    totalSupply = BigInt(0),
  ] = data?.map((d) => d.result) ?? [];

  const res = {
    balanceOfAddress,
    decimals,
    name,
    symbol,
    totalSupply,
  };
  return {
    data: res,
    error,
    isLoading,
    isError,
    refetch,
  };
};

// write example
export const useMintTestToken = () => {
  const chainId = useChainId();
  const contract = getTestTokenContract(chainId);

  const [isConfirmed, setIsConfirmed] = useState(false);
  const {
    data: hash,
    isPending,
    error: excuteError,
    isError: isExcuteError,
    writeContractAsync,
  } = useWriteContract();
  const {
    isLoading: isConfirming,
    error: callError,
    isError: isCallError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const writeContract = async (address: Address, amount: bigint) => {
    setIsConfirmed(false);
    const hash = await writeContractAsync({
      ...contract,
      functionName: "mint",
      args: [address, amount],
    });
    const { receipt, isConfirmed } = await waitForTransactionReceipt(hash);
    return {
      receipt,
      isConfirmed,
    };
  };

  const error = callError || excuteError;
  return {
    isConfirmed,
    writeContract,
    isPending: isConfirming || isPending,
    hash,
    errorMessage:
      (error as BaseError)?.shortMessage || error?.message || "Unknown error",
    isError: isCallError || isExcuteError,
  };
};
