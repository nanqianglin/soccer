import { useQuery } from "@tanstack/react-query";

import useContractInstance from "./useContractInstance";

export default function useGambleDetails(id: number) {
  const contract = useContractInstance();

  async function getDetails({ queryKey }: {
    queryKey: [string, number]
  }) {
    const [, _id] = queryKey
    if (!contract) return;
    return await contract.gambleList(_id)
  }

  const result = useQuery(["getDetails", id], getDetails)

  return {
    ...result
  };
}
