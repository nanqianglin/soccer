import { useToast } from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { ethers, BigNumber } from "ethers";
import useContractInstance from "./useContractInstance";

interface Data {
  amount: string,
}

export default function useSupplyCro() {
  const toast = useToast();
  const contract = useContractInstance(true);

  async function supplyCro(data: Data) {
    if (!contract) return;

    const amount = ethers.utils.parseEther(data.amount);
    const id = BigNumber.from('0');

    return await contract.supplyCro(id, amount);
  }

  return useMutation((data: Data) =>
    supplyCro(data), {
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
