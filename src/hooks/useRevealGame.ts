import { useToast } from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { ethers, BigNumber } from "ethers";
import useContractInstance from "./useContractInstance";

interface Data {
  id: BigNumber,
  option: string,
}

export default function useRevealGame() {
  const toast = useToast();
  const contract = useContractInstance(true);

  async function playGamble(data: Data) {
    if (!contract) return;

    const id = data.id;
    const option = BigNumber.from(data.option);

    return await contract.revealGamble(id, option);
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
