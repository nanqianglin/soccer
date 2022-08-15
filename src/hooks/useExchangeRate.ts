import { useQuery } from "@tanstack/react-query";

import useContractInstance from "./useContractInstance";

export default function useExchangeRate() {
  const contract = useContractInstance();

  async function getExchangeRate() {
    if (!contract) return;
    // 1031982693
    // 1031982693003334244756006258
    return await contract.getSupplyCro()
  }

  const result = useQuery(["getExchangeRate"], getExchangeRate)

  return {
    ...result
  };
}
