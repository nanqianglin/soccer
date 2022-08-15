import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";

import useContractInstance from "./useContractInstance";

export default function useContractBalance() {
  const contract = useContractInstance();

  async function getContractBalance() {
    if (!contract) return;
    const id = BigNumber.from('0');
    // return await contract.getContractBalance(id);
    return await contract.getFactoryBalance();
  }

  const result = useQuery(["getContractBalance"], getContractBalance)

  return {
    ...result
  };
}
