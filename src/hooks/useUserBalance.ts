import { useQuery } from "@tanstack/react-query";

import useContractInstance from "./useContractInstance";

export default function useUserBalance(address?: string) {
  const contract = useContractInstance();

  async function getUserBalance({ queryKey }: {
    queryKey: [string, string | undefined]
  }) {
    const [, _address] = queryKey;
    if (!contract || !_address) return;
    return await contract.userBalances(_address)
  }

  const result = useQuery(["getUserBalance", address], getUserBalance)

  return {
    ...result
  };
}
