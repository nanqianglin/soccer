import { useProvider, useSigner, useContract } from "wagmi";

import SoccerGamblingContract from "abi/SoccerGambling.json";

export default function useContractInstance(needSigner?: boolean) {
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  const contract = useContract({
    addressOrName: SoccerGamblingContract.address,
    contractInterface: SoccerGamblingContract.abi,
    signerOrProvider: needSigner ? signer : provider,
  });

  return contract;
}
