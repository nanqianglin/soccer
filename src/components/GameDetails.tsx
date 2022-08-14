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
import PlayForm from "./PlayForm";
import RevealGameButton from "./RevealGame/RevealGameButton";

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

	const { isLoading, approvers, quorum, rejectQuorum, correctAnswer } =
		useGameExtraInfo(data.id);

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
			{(isExpired || isFinished || isRevealed) && (
				<RadioGroup mt={6}>
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
				{isExpired && (
					<Box mt={4}>
						{/* Reveal Button */}
						{isOwner ? (
							<RevealGameButton />
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
							This game is revealed and waiting for approval. And the correct
							answer is {correctAnswer}
						</Alert>
						{/* Approve Button */}
						{/* Reject Button */}
						{isApprover && (
							<>
								<Button colorScheme='purple'>Approve the game</Button>
								<Button colorScheme='red'>Reject the game</Button>
							</>
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
