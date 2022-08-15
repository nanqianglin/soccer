import { useQuery } from "@tanstack/react-query";

import useContractInstance from "./useContractInstance";

export default function useGambleDetails(id: number) {
  const contract = useContractInstance();

  async function getDetails({ queryKey }: {
    queryKey: [string, number]
  }) {
    if (!contract) return;
    const [, _id] = queryKey
    return await contract.getGambleList()
  }

  const result = useQuery(["getDetails", id], getDetails)

  return {
    ...result
  };
}
