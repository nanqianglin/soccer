import { useQuery } from "@tanstack/react-query";
import { useProvider } from "wagmi";

export default function useBlockTimestamp() {
  const provider = useProvider();

  async function getTimestamp() {
    if (!provider) return;
    return await provider.getBlock('latest');
  }

  const result = useQuery(["getTimestamp"], getTimestamp)

  return {
    ...result,
    data: result.data?.timestamp ?? 0
  };
}