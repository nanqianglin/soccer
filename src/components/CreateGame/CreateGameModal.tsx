import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	FormControl,
	FormLabel,
	Input,
	ModalFooter,
	Button,
	VStack,
	FormErrorMessage,
	Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Field, Formik, FormikHelpers } from "formik";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import useCreateGamble from "hooks/useCreateGamble";

interface Props {
	initialRef: React.MutableRefObject<null>;
	finalRef: React.MutableRefObject<null>;
	isOpen: boolean;
	onClose: VoidFunction;
}

interface Values {
	title: string;
	description: string;
	amount: string;
	expiredAt: Date;
	optionA: string;
	optionB: string;
	rateA: string;
	rateB: string;
}

const CreateGameModal = ({ initialRef, finalRef, isOpen, onClose }: Props) => {
	const start = new Date();
	start.setDate(start.getDate() + 1);
	start.setHours(0, 0, 0, 0);
	const [date, setDate] = useState(start);

	const { isLoading, isSuccess, mutate } = useCreateGamble();

	const initialValues = {
		title: "",
		description: "",
		amount: "",
		expiredAt: date,
		optionA: "",
		optionB: "",
		rateA: "",
		rateB: "",
	};

	useEffect(() => {
		isSuccess && onClose();
	}, [isSuccess, onClose]);

	const handleCreate = (values: Values) => {
		mutate({
			title: values.title,
			description: values.description,
			amount: String(values.amount),
			expiredAt: values.expiredAt,
			optionA: values.optionA,
			optionB: values.optionB,
			rateA: Number(values.rateA),
			rateB: Number(values.rateB),
		});
	};

	return (
		<Modal
			initialFocusRef={initialRef}
			finalFocusRef={finalRef}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create a new soccer prize</ModalHeader>
				<ModalCloseButton />
				<Formik initialValues={initialValues} onSubmit={handleCreate}>
					{({ handleSubmit, errors, touched, isSubmitting, setFieldValue }) => (
						<form onSubmit={handleSubmit}>
							<ModalBody pb={6}>
								<VStack spacing={4} align='flex-start'>
									<FormControl isInvalid={!!errors.title && touched.title}>
										<FormLabel htmlFor='title'>Title</FormLabel>
										<Field
											as={Input}
											id='title'
											name='title'
											validate={(value: string) => {
												let error;
												if (!value) {
													error = "Required";
												}
												return error;
											}}
										/>
										<FormErrorMessage>{errors.title}</FormErrorMessage>
									</FormControl>

									<FormControl
										isInvalid={!!errors.description && touched.description}
									>
										<FormLabel htmlFor='description'>Description</FormLabel>
										<Field
											as={Input}
											id='description'
											name='description'
											validate={(value: string) => {
												let error;
												if (!value) {
													error = "Required";
												}
												return error;
											}}
										/>
										<FormErrorMessage>{errors.description}</FormErrorMessage>
									</FormControl>

									<FormControl isInvalid={!!errors.amount && touched.amount}>
										<FormLabel htmlFor='amount'>CRO prizes amount</FormLabel>
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
												if (value <= 100) {
													error =
														"Must put more than 100 cro as the prizes value";
												}

												return error;
											}}
										/>
										<FormErrorMessage>{errors.amount}</FormErrorMessage>
									</FormControl>
									<FormControl>
										<FormLabel htmlFor='expiredAt'>Will expired at</FormLabel>
										<Field
											as={SingleDatepicker}
											id='expiredAt'
											name='expiredAt'
											date={date}
											onDateChange={(date: Date) => {
												setDate(date);
												setFieldValue("expiredAt", date);
											}}
										/>
									</FormControl>
									<Flex>
										<FormControl
											isInvalid={!!errors.optionA && touched.optionA}
											mr={8}
										>
											<FormLabel htmlFor='optionA'>Option A</FormLabel>
											<Field
												as={Input}
												id='optionA'
												name='optionA'
												validate={(value: string) => {
													let error;
													if (!value) {
														error = "Required";
													}
													return error;
												}}
											/>
											<FormErrorMessage>{errors.optionA}</FormErrorMessage>
										</FormControl>
										<FormControl
											isInvalid={!!errors.optionB && touched.optionB}
										>
											<FormLabel htmlFor='optionB'>Option B</FormLabel>
											<Field
												as={Input}
												id='optionB'
												name='optionB'
												validate={(value: string) => {
													let error;
													if (!value) {
														error = "Required";
													}
													return error;
												}}
											/>
											<FormErrorMessage>{errors.optionB}</FormErrorMessage>
										</FormControl>
									</Flex>

									<Flex>
										<FormControl
											isInvalid={!!errors.rateA && touched.rateA}
											mr={8}
										>
											<FormLabel htmlFor='rateA'>Rate A</FormLabel>
											<Field
												as={Input}
												id='rateA'
												name='rateA'
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
											<FormErrorMessage>{errors.rateA}</FormErrorMessage>
										</FormControl>
										<FormControl isInvalid={!!errors.rateB && touched.rateB}>
											<FormLabel htmlFor='rateB'>Rate B</FormLabel>
											<Field
												as={Input}
												id='rateB'
												name='rateB'
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
											<FormErrorMessage>{errors.rateB}</FormErrorMessage>
										</FormControl>
									</Flex>
								</VStack>
							</ModalBody>

							<ModalFooter>
								<Button
									colorScheme='purple'
									mr={3}
									type='submit'
									isLoading={isLoading}
								>
									Create
								</Button>
								<Button onClick={onClose}>Cancel</Button>
							</ModalFooter>
						</form>
					)}

					{/* <FormControl>
						<FormLabel>First name</FormLabel>
						<Input ref={initialRef} placeholder='First name' />
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Last name</FormLabel>
						<Input placeholder='Last name' />
					</FormControl> */}
				</Formik>
			</ModalContent>
		</Modal>
	);
};

export default CreateGameModal;
