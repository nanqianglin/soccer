import { Box, Button, Text } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import useApproveOrReject from "hooks/useApproveOrReject";
import React from "react";

const ApproveOrReject = ({
	id,
	isApprovedOrRejected,
}: {
	id: BigNumber;
	isApprovedOrRejected: boolean;
}) => {
	const { isLoading, isSuccess, mutate } = useApproveOrReject();

	const handleApprove = () => {
		mutate({
			id,
		});
	};
	const handleReject = () => {
		mutate({
			id,
			isReject: true,
		});
	};

	return (
		<Box mt={6}>
			<Button
				colorScheme='purple'
				onClick={handleApprove}
				mr={6}
				disabled={isApprovedOrRejected || isLoading}
			>
				Approve the result
			</Button>
			<Button
				colorScheme='red'
				onClick={handleReject}
				disabled={isApprovedOrRejected || isLoading}
			>
				Reject the result
			</Button>
			{isApprovedOrRejected && (
				<Text color='gray.600' mt={4} fontSize='small'>
					(You have approved or rejected)
				</Text>
			)}

			<Text color='gray.600' mt={4} fontSize='small'>
				Note: If this answer is not a valid answer, you can reject it. And it
				will punish the owner of the gamble.
			</Text>
		</Box>
	);
};

export default ApproveOrReject;
