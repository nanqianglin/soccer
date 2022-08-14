import { useToast } from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { ethers, BigNumber } from "ethers";
import useContractInstance from "./useContractInstance";

interface Data {
  id: number,
  amount: string,
  option: string,
}

export default function usePlayGamble() {
  const toast = useToast();
  const contract = useContractInstance(true);

  async function playGamble(data: Data) {
    if (!contract) return;

    const id = BigNumber.from(data.id);
    const option = BigNumber.from(data.option);

    const value = ethers.utils.parseEther(data.amount);

    return await contract.playGamble(id, option, {
      value,
    });
  }

  return useMutation((data: Data) =>
    playGamble(data), {
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
