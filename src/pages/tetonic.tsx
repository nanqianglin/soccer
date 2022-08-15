import type { NextPage } from "next";
import { VStack, Heading, Box, Text } from "@chakra-ui/layout";
import { useAccount } from "wagmi";
import { Field, Formik, FieldProps, FormikHelpers } from "formik";

import Loading from "components/Loading";
import React from "react";
import useUserBalance from "hooks/useUserBalance";
import { BigNumber, ethers } from "ethers";
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
import useContractBalance from "hooks/useContractBalance";
import useBonus from "hooks/useBonus";
import useSupplyCro from "hooks/useSupplyCro";
import useRedeemCro from "hooks/useRedeemCro";
import useExchangeRate from "hooks/useExchangeRate";

interface Values {
	amount: string;
}

const Tetonic: NextPage = () => {
	const { address } = useAccount();

	const { data, isLoading } = useContractBalance();
	// const { data: rate } = useExchangeRate();
	// const { data: bonus } = useBonus();
	const balance = data && ethers.utils.formatEther(data);

	const { mutate } = useSupplyCro();
	const { mutate: redeemCro } = useRedeemCro();

	const ref = React.useRef<any>(null);

	const handleWithdraw = (values: Values, actions: FormikHelpers<Values>) => {
		mutate({
			amount: String(values.amount),
		});
		ref.current = actions.resetForm;
	};

	const handleRedeem = () => {
		redeemCro();
	};

	return (
		<>
			<Heading as='h2' my={4}>
				Contract Balance
			</Heading>
			<Box mb={4}></Box>
			{isLoading && <Loading />}
			<VStack>
				<Box>
					<Text>The balance of contract is {balance} CRO</Text>
					<Text>Your can supply it in the Tetonic to earn CRO.</Text>
				</Box>

				<Button onClick={handleRedeem}>Redeem</Button>

				<Formik initialValues={{ amount: "" }} onSubmit={handleWithdraw}>
					{({ handleSubmit, errors, touched, isSubmitting }) => (
						<form onSubmit={handleSubmit}>
							<VStack spacing={4} align='flex-start'>
								<FormControl isInvalid={!!errors.amount && touched.amount}>
									<FormLabel htmlFor='amount'>Supply CRO amount</FormLabel>
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

								<Button
									type='submit'
									colorScheme='purple'
									isLoading={isLoading}
								>
									Supply
								</Button>
							</VStack>
						</form>
					)}
				</Formik>
			</VStack>
		</>
	);
};

export default Tetonic;
