import {
	Alert,
	AlertIcon,
	Badge,
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Radio,
	RadioGroup,
	Text,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import useGameExtraInfo from "hooks/useGameExtraInfo";
import moment from "moment";
import React, { useCallback } from "react";
import { useAccount, useBlockNumber } from "wagmi";
import ApproveOrReject from "./ApproveOrReject";
import FinishOrPunish from "./FinishOrPunish";
import PlayForm from "./PlayForm";
import RevealForm from "./RevealGame/RevealForm";

interface Props {
	data: any;
}

const GameDetails = ({ data }: Props) => {
	const { address } = useAccount();

	const gameInfo = data.gambleInfo;
	const gameStatus = data.gambleStatus;

	const options = gameInfo.options.map((item: string, index: number) => ({
		key: index,
		label: item,
		value: String(index),
	}));

	const expiredAt = moment(gameInfo.expiredAt.toNumber() * 1000);
	const isExpired = expiredAt.isBefore(moment());
	const isRevealed = gameStatus.isRevealed;
	const isFinished = gameStatus.isFinished;
	const isOwner = gameInfo.owner === address;

	const {
		isLoading,
		approvers,
		quorum,
		rejectQuorum,
		correctAnswer,
		isApprovedOrRejected,
	} = useGameExtraInfo(data.id, address);

	// get data from the contract
	const isApprover = approvers?.includes(address);
	const canFinish = quorum && gameStatus.approvers.gte(quorum);
	const shouldPunish = rejectQuorum && gameStatus.rejecters.gte(rejectQuorum);

	const renderGameOptions = useCallback(() => {
		if (isOwner && !isRevealed) return;

		return (
			<RadioGroup mt={10}>
				{options.map((item: any) => (
					<Radio
						key={item.key}
						value={item.value}
						mr={10}
						colorScheme='purple'
						isDisabled
					>
						{item.label}
					</Radio>
				))}
			</RadioGroup>
		);
	}, [isOwner, isRevealed, options]);

	const renderStatusSection = useCallback(() => {
		// can play game
		if (!isExpired && !isFinished && !isRevealed) {
			return <PlayForm id={data.id.toNumber()} gameInfo={gameInfo} />;
		}
		// can reveal
		if (isExpired && !isRevealed && !isFinished) {
			return (
				<Box mt={4}>
					{/* Reveal Button */}
					{isOwner ? (
						<RevealForm id={data.id} gameInfo={gameInfo} />
					) : (
						<Alert status='warning'>
							<AlertIcon />
							This game is expired and waiting for reveal.
						</Alert>
					)}
				</Box>
			);
		}
		// the game is finished
		if (isFinished) {
			return (
				<Box mt={4}>
					<Box mt={6}>
						And the correct answer is{" "}
						<Text color='red' fontWeight='bold'>
							{correctAnswer !== undefined ? options[correctAnswer].label : ""}
						</Text>
					</Box>
					<Alert status='warning' mt={4}>
						<AlertIcon />
						This game is finished.
					</Alert>
				</Box>
			);
		}
		// can punish or finish
		if (shouldPunish || canFinish) {
			return (
				<FinishOrPunish
					id={data.id}
					shouldPunish={shouldPunish}
					correctAnswer={
						correctAnswer !== undefined ? options[correctAnswer].label : ""
					}
				/>
			);
		}

		// can approve
		if (isRevealed && !isFinished) {
			return (
				<Box mt={4}>
					<Alert status='warning'>
						<AlertIcon />
						This game is revealed and waiting for approval.
					</Alert>
					<Box mt={6}>
						And the correct answer is{" "}
						<Text color='red' fontWeight='bold'>
							{correctAnswer !== undefined ? options[correctAnswer].label : ""}
						</Text>
					</Box>
					{/* Approve Button */}
					{/* Reject Button */}
					{isApprover && (
						<ApproveOrReject
							id={data.id}
							isApprovedOrRejected={Boolean(isApprovedOrRejected)}
						/>
					)}
				</Box>
			);
		}
	}, [
		canFinish,
		correctAnswer,
		data.id,
		gameInfo,
		isApprovedOrRejected,
		isApprover,
		isExpired,
		isFinished,
		isOwner,
		isRevealed,
		options,
		shouldPunish,
	]);

	return (
		<Box border='1px solid' borderColor='gray.200' borderRadius={8} p={10}>
			<Heading as='h5'>{gameInfo.title}</Heading>
			<Text fontSize='lg' mt={4}>
				{gameInfo.description}
			</Text>
			{renderGameOptions()}
			<Box mt={10}>{renderStatusSection()}</Box>

			{!isExpired && (
				<Text fontSize='sm' mt={4} color='red'>
					This game is expired at {expiredAt.format("MMM DD, YYYY")}
				</Text>
			)}
		</Box>
	);
};

export default GameDetails;
