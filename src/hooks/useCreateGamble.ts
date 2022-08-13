import { useQuery, useMutation } from "@tanstack/react-query";

import { ethers } from "ethers";
import useContractInstance from "./useContractInstance";

export default function useCreateGamble() {
  const contract = useContractInstance(true);

  async function createGamble() {
    if (!contract) return;
    const title = "Mexico vs Brazil";
    const description =
      "Mexico-Brazil | Who will won?";
    const expiredAt = 1662940800; // 2022-09-12
    const options = {
      optionA: "A. Mexico",
      optionB: "B. Brazil",
    };
    const rate = {
      rateA: 1,
      rateB: 2,
    };

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

    const value = ethers.utils.parseEther("102");

    return await contract.createGamble(title, description, options, rate, expiredAt, {
      value,
    });
  }

  return useMutation(createGamble, {
    onError: (err: Error) => { console.log(err) }
  });
}
