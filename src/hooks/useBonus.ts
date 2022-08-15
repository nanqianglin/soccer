import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";

import useContractInstance from "./useContractInstance";

export default function useBonus() {
  const contract = useContractInstance();

  async function getBonus() {
    if (!contract) return;
    const id = BigNumber.from('0');
    return await contract.currentBonus(id);
  }

  const result = useQuery(["getBonus"], getBonus)

  return {
    ...result
  };
}
