import { useQueries } from "@tanstack/react-query";
import { BigNumber } from "ethers";

import useContractInstance from "./useContractInstance";

export default function useGameExtraInfo(id: BigNumber, address?: string) {
  const contract = useContractInstance();

  async function getApprovers() {
    if (!contract) return;
    return await contract.getApprovers()
  }
  async function getQuorum() {
    if (!contract) return;
    return await contract.quorum()
  }
  async function getRejectQuorum() {
    return await contract.rejectQuorum()
  }
  async function getCorrectAnswer({ queryKey }: {
    queryKey: [string, BigNumber]
  }) {
    if (!contract) return;
    const [, _id] = queryKey
    return await contract.correctAnswers(_id)
  }

  async function getIsApprovedOrRejected({ queryKey }: {
    queryKey: [string, BigNumber, string | undefined]
  }) {
    const [, _id, _address] = queryKey
    if (!contract) return;
    if (!_address) return;
    return await contract.isApprovedOrRejected(_id, _address);
  }

  const [approversData, quorumData, rejectQuorumData, correctAnswersData, isApprovedOrRejectedData] = useQueries({
    queries: [
      { queryKey: ['getApprovers'], queryFn: getApprovers },
      { queryKey: ['getQuorum'], queryFn: getQuorum },
      { queryKey: ['getRejectQuorum'], queryFn: getRejectQuorum },
      { queryKey: ['getCorrectAnswer', id], queryFn: getCorrectAnswer },
      { queryKey: ['getIsApprovedOrRejected', id, address], queryFn: getIsApprovedOrRejected },
    ]
  })

  return {
    ...approversData,
    ...quorumData,
    ...rejectQuorumData,
    ...correctAnswersData,
    ...isApprovedOrRejectedData,
    approvers: approversData.data,
    quorum: quorumData.data,
    rejectQuorum: rejectQuorumData.data,
    correctAnswer: correctAnswersData.data,
    isApprovedOrRejected: isApprovedOrRejectedData.data,
  };
}