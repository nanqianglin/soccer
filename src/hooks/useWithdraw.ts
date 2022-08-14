import { useToast } from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { ethers, BigNumber } from "ethers";
import useContractInstance from "./useContractInstance";

interface Data {
  amount: string,
  recipient: string,
}

export default function useWithdraw() {
  const toast = useToast();
  const contract = useContractInstance(true);

  async function withdraw(data: Data) {
    if (!contract) return;

    const value = ethers.utils.parseEther(data.amount);

    return await contract.withdrawTo(value, data.recipient);
  }

  return useMutation((data: Data) =>
    withdraw(data), {
    onError: (err: Error & { reason: string, code: number }) => {
      toast({
        title: "Error!",
        description: err.reason ?? err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  });
}
