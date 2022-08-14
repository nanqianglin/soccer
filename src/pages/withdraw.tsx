import type { NextPage } from "next";
import { VStack, Heading, Box, Text } from "@chakra-ui/layout";
import { useAccount } from "wagmi";
import { Field, Formik, FieldProps, FormikHelpers } from "formik";

import Loading from "components/Loading";
import React from "react";
import useUserBalance from "hooks/useUserBalance";
import { ethers } from "ethers";
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	RadioGroup,
	Radio,
	Button,
} from "@chakra-ui/react";
import useWithdraw from "hooks/useWithdraw";

interface Values {
	amount: string;
	recipient: string;
}

const Withdraw: NextPage = () => {
	const { address } = useAccount();

	const { data, isLoading } = useUserBalance(address);
	const balance = data && ethers.utils.formatEther(data);

	const { isLoading: mutationLoading, isSuccess, mutate } = useWithdraw();

	const ref = React.useRef<any>(null);

	const handleWithdraw = (values: Values, actions: FormikHelpers<Values>) => {
		mutate({
			amount: String(values.amount),
			recipient: values.recipient,
		});
		ref.current = actions.resetForm;
	};

	return (
		<>
			<Heading as='h2' my={4}>
				Your Balance
			</Heading>
			<Box mb={4}></Box>
			{isLoading && <Loading />}
			<VStack>
				<Box>
					<Text>Your balance is {balance} CRO</Text>
					<Text>Your can withdraw it.</Text>
				</Box>

				<Formik
					initialValues={{ amount: "", recipient: "" }}
					onSubmit={handleWithdraw}
				>
					{({ handleSubmit, errors, touched, isSubmitting }) => (
						<form onSubmit={handleSubmit}>
							<VStack spacing={4} align='flex-start'>
								<FormControl isInvalid={!!errors.amount && touched.amount}>
									<FormLabel htmlFor='amount'>CRO amount</FormLabel>
									<Field
										as={Input}
										id='amount'
										name='amount'
										type='number'
										validate={(value: number) => {
											let error;
											if (!value) {
												error = "Required";
											} else {
												if (!Number.isInteger(value)) {
													error = "Must be integer";
												}
											}
											return error;
										}}
									/>
									<FormErrorMessage>{errors.amount}</FormErrorMessage>
								</FormControl>

								<FormControl
									isInvalid={!!errors.recipient && touched.recipient}
								>
									<FormLabel htmlFor='recipient'>Recipient</FormLabel>
									<Field
										as={Input}
										id='recipient'
										name='recipient'
										validate={(value: number) => {
											let error;
											if (!value) {
												error = "Required";
											}
											return error;
										}}
									/>
									<FormErrorMessage>{errors.recipient}</FormErrorMessage>
								</FormControl>

								<Button
									type='submit'
									colorScheme='purple'
									isLoading={isLoading}
								>
									Withdraw
								</Button>
							</VStack>
						</form>
					)}
				</Formik>
			</VStack>
		</>
	);
};

export default Withdraw;
