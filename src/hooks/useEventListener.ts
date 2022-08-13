import { useContractEvent } from "wagmi";
import { Listener } from "@ethersproject/providers";

import SoccerGamblingContract from "abi/SoccerGambling.json";

export default function useEventListener(eventName: string, listener: Listener) {
  useContractEvent({
    addressOrName: SoccerGamblingContract.address,
    contractInterface: SoccerGamblingContract.abi,
    once: true,
    eventName,
    listener,
  });
}