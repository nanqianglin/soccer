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
import React from "react";
import { useAccount, useBlockNumber } from "wagmi";
import ApproveOrReject from "./ApproveOrReject";
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

	return (
		<Box border='1px solid' borderColor='gray.200' borderRadius={8} p={10}>
			<Heading as='h5'>{gameInfo.title}</Heading>
			<Text fontSize='lg' mt={4}>
				{gameInfo.description}
			</Text>
			{(isExpired || isFinished) && (!isOwner || isRevealed) && (
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
			)}
			<Box mt={10}>
				{!isExpired && !isFinished && !isRevealed && (
					<PlayForm id={data.id.toNumber()} gameInfo={gameInfo} />
				)}
				{/* Finished status */}
				{isFinished && (
					<Alert status='warning' mt={4}>
						<AlertIcon />
						This game is finished.
					</Alert>
				)}
				{/* Expired status */}
				{isExpired && !isRevealed && (
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
				)}
				{/* Revealed status */}
				{isRevealed && !isFinished && (
					<Box mt={4}>
						<Alert status='warning'>
							<AlertIcon />
							This game is revealed and waiting for approval.
						</Alert>
						<Box mt={6}>
							And the correct answer is{" "}
							<Text color='red' fontWeight='bold'>
								{correctAnswer !== undefined
									? options[correctAnswer].label
									: ""}
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
				)}
				{/* Finish Button */}
				{canFinish && (
					<Box mt={4}>
						<Button colorScheme='purple'>Finish the game</Button>
					</Box>
				)}
				{/* Punish Button */}
				{shouldPunish && (
					<Box mt={4}>
						<Button colorScheme='purple'>Punish the game owner</Button>
					</Box>
				)}
			</Box>

			{!isExpired && (
				<Text fontSize='sm' mt={4} color='red'>
					This game is expired at {expiredAt.format("MMM DD, YYYY")}
				</Text>
			)}
		</Box>
	);
};

export default GameDetails;
