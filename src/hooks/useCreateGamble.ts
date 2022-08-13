import { useQuery, useMutation } from "@tanstack/react-query";

import { ethers, BigNumber } from "ethers";
import useContractInstance from "./useContractInstance";

interface Data {
  title: string,
  amount: string,
  description: string,
  optionA: string,
  optionB: string,
  rateA: number,
  rateB: number,
  expiredAt: Date,
}

export default function useCreateGamble() {
  const contract = useContractInstance(true);

  async function createGamble(data: Data) {
    if (!contract) return;
    // const title = "Mexico vs Brazil";
    // const description =
    //   "Mexico-Brazil | Who will won?";
    // const expiredAt = 1662940800; // 2022-09-12
    // const options = {
    //   optionA: "A. Mexico",
    //   optionB: "B. Brazil",
    // };
    // const rate = {
    //   rateA: 1,
    //   rateB: 2,
    // };

    // const title = "Spain vs France";
    // const description =
    //   "Spain-France | UEFA Nations League 2021, who will won?";
    // const expiredAt = 1662940800; // 2022-09-12
    // const options = {
    //   optionA: "A. Spain",
    //   optionB: "B. France",
    // };
    // const rate = {
    //   rateA: 1,
    //   rateB: 2,
    // };

    const title = data.title
    const description = data.description
    const optionA = data.optionA
    const optionB = data.optionB
    const rateA = BigNumber.from(data.rateA)
    const rateB = BigNumber.from(data.rateB)
    const expiredAt = BigNumber.from((+data.expiredAt) / 1000)

    const options = {
      optionA,
      optionB,
    }
    const rate = {
      rateA,
      rateB,
    }

    const value = ethers.utils.parseEther(data.amount);

    return await contract.createGamble(title, description, options, rate, expiredAt, {
      value,
    });
  }

  return useMutation((data: Data) =>
    createGamble(data), {
    onError: (err: Error) => { console.log(err) }
  });
}
