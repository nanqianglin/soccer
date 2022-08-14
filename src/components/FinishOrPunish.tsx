import { Box, Button, Text } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import useFinishOrPunish from "hooks/useFinishOrPunish";
import React from "react";

const FinishOrPunish = ({
	id,
	correctAnswer,
	shouldPunish,
}: {
	id: BigNumber;
	correctAnswer: string;
	shouldPunish: boolean;
}) => {
	const { isLoading, isSuccess, mutate } = useFinishOrPunish();

	const handleFinish = () => {
		mutate({
			id,
		});
	};
	const handlePunish = () => {
		mutate({
			id,
			isPunish: true,
		});
	};

	const renderCorrectAnswer = (
		<Box mt={6}>
			And the correct answer is{" "}
			<Text color='red' fontWeight='bold'>
				{correctAnswer}
			</Text>
		</Box>
	);

	if (shouldPunish) {
		return (
			<Box mt={4}>
				{renderCorrectAnswer}
				<Text fontSize='small' my={2}>
					This game is dishonest, as it got some rejecters. Please punish
					he/she, thank you!
				</Text>
				<Button colorScheme='red' isLoading={isLoading} onClick={handlePunish}>
					Punish the game owner
				</Button>
			</Box>
		);
	}

	return (
		<Box mt={4}>
			{renderCorrectAnswer}
			<Text fontSize='small' my={2}>
				This game can be finish, as it got enough approvers. Please finish it,
				thank you!
			</Text>
			<Button colorScheme='purple' isLoading={isLoading} onClick={handleFinish}>
				Finish the game
			</Button>
		</Box>
	);
};

export default FinishOrPunish;
