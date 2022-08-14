import { useToast } from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { ethers, BigNumber } from "ethers";
import useContractInstance from "./useContractInstance";

interface Data {
  id: BigNumber,
  isReject?: boolean
}

export default function useApproveOrReject() {
  const toast = useToast();
  const contract = useContractInstance(true);

  async function approveOrReject(data: Data) {
    if (!contract) return;

    const id = data.id;
    if (data.isReject) return await contract.rejectGamble(id);
    return await contract.approveGamble(id);
  }

  return useMutation((data: Data) =>
    approveOrReject(data), {
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
