import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Button,
	Radio,
	RadioGroup,
	VStack,
	Text,
} from "@chakra-ui/react";
import { Form, Field, Formik, FieldProps } from "formik";
import React from "react";

interface Props {
	id: number;
	gameInfo: any;
}

// using the number type, will cause some issues, so using the string type
interface Values {
	amount: string;
	option: string;
}

const PlayForm = ({ id, gameInfo }: Props) => {
	const options = gameInfo.options.map((item: string, index: number) => ({
		key: index,
		label: item,
		value: String(index),
	}));

	console.log(id);

	return (
		<Formik
			initialValues={{ amount: "", option: "" }}
			onSubmit={(values: Values, actions) => {
				setTimeout(() => {
					console.log(values);
					actions.setSubmitting(false);
				}, 1000);
			}}
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
									}
									return error;
								}}
							/>
							<FormErrorMessage>{errors.amount}</FormErrorMessage>
						</FormControl>
						<Field
							name='option'
							validate={(value: string) => {
								let error;
								if (value.length === 0) {
									error = "Required";
								}
								return error;
							}}
						>
							{({ field, form }: FieldProps) => {
								const { onChange, ...rest } = field;
								return (
									<FormControl
										id='option'
										isInvalid={!!form.errors.option && !!form.touched.option}
									>
										<FormLabel htmlFor='option'>Team</FormLabel>
										<RadioGroup {...rest} id='label'>
											{options.map((item: any) => (
												<Radio
													onChange={onChange}
													key={item.key}
													value={item.value}
													mr={10}
													colorScheme='purple'
												>
													{item.label}
												</Radio>
											))}
										</RadioGroup>
										<FormErrorMessage>{errors.option}</FormErrorMessage>
									</FormControl>
								);
							}}
						</Field>
						<Text>
							This game odds is [{gameInfo.rate.rateA.toString()} :{" "}
							{gameInfo.rate.rateB.toString()} ]
						</Text>

						<Button type='submit' colorScheme='purple' isLoading={isSubmitting}>
							Play game
						</Button>
					</VStack>
				</form>
			)}
		</Formik>
	);
};

export default PlayForm;
