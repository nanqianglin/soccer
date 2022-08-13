import { useQuery } from "@tanstack/react-query";

import useContractInstance from "./useContractInstance";

export default function useGambleList() {
  const contract = useContractInstance();

  async function getLists() {
    if (!contract) return;
    return await contract.getGambleList()
  }

  const result = useQuery(["getLists"], getLists)

  return {
    ...result
  };
}
