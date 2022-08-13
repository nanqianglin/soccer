import {
	Box,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Radio,
	RadioGroup,
	Text,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import React from "react";
import PlayForm from "./PlayForm";

interface Props {
	data: any;
}

const GameDetails = ({ data }: Props) => {
	const gameInfo = data.gambleInfo;
	const gameStatus = data.gambleStatus;
	// console.log(data);

	return (
		<Box border='1px solid' borderColor='gray.200' borderRadius={8} p={10}>
			<Heading as='h5'>{gameInfo.title}</Heading>
			<Text fontSize='lg' mt={4}>
				{gameInfo.description}
			</Text>
			<Box mt={10}>
				<PlayForm id={data.id.toNumber()} gameInfo={gameInfo} />
				{/* Reveal Button */}
				{/* Approve Button */}
				{/* Reject Button */}
				{/* Punish Button */}
				{/* Finish Button */}
			</Box>
		</Box>
	);
};

export default GameDetails;
