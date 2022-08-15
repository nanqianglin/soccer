import { useToast } from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { ethers, BigNumber } from "ethers";
import useContractInstance from "./useContractInstance";

export default function useRedeemCro() {
  const toast = useToast();
  const contract = useContractInstance(true);

  async function redeemCro() {
    if (!contract) return;

    const amount = ethers.utils.parseEther('10');
    const id = BigNumber.from('0');
    // return await contract.redeemCro(amount);
    return await contract.redeemCro(id);
    // return await contract.redeemCroTest();
  }

  return useMutation(() =>
    redeemCro(), {
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
