import { useQuery } from "@tanstack/react-query";

import useContractInstance from "./useContractInstance";

export default function useGambleDetails(id: number) {
  const contract = useContractInstance();

  async function getDetails() {
    if (!contract) return;
    return await contract.gambleList(id)
  }

  const result = useQuery(["getDetails"], getDetails)

  return {
    ...result
  };
}
