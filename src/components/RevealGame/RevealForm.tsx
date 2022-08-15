import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Radio,
	RadioGroup,
	VStack,
	Text,
	Highlight,
} from "@chakra-ui/react";
import React from "react";
import { Field, Formik, FieldProps, FormikHelpers } from "formik";
import useRevealGame from "hooks/useRevealGame";
import { BigNumber } from "ethers";

interface Props {
	id: BigNumber;
	gameInfo: any;
}

interface Values {
	option: string;
}

const RevealForm = ({ id, gameInfo }: Props) => {
	const options = gameInfo.options.map((item: string, index: number) => ({
		key: index,
		label: item,
		value: String(index),
	}));

	const ref = React.useRef<any>(null);

	const { isLoading, isSuccess, mutate } = useRevealGame();

	const handleReveal = (values: Values, actions: FormikHelpers<Values>) => {
		mutate({
			id,
			option: values.option,
		});
		ref.current = actions.resetForm;
	};

	return (
		<Formik initialValues={{ option: "" }} onSubmit={handleReveal}>
			{({ handleSubmit, errors, touched, isSubmitting }) => (
				<form onSubmit={handleSubmit}>
					<VStack spacing={4} align='flex-start'>
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
										<FormLabel htmlFor='option'>
											The correct answer is?
										</FormLabel>
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
						<Button type='submit' colorScheme='purple' isLoading={isLoading}>
							Reveal the game
						</Button>
						<Text color='red'>
							Please be honest for the result, or you will get a punishment and
							lose the money.
						</Text>
					</VStack>
				</form>
			)}
		</Formik>
	);
};

export default RevealForm;
