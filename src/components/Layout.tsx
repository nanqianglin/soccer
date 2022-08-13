import React, { ReactNode } from "react";
import {
	Text,
	Center,
	Container,
	useColorModeValue,
	Box,
} from "@chakra-ui/react";
import Header from "./Header";

type Props = {
	children: ReactNode;
};

export function Layout(props: Props) {
	return (
		<div>
			<Header />
			<Container maxW='container.md' py='8'>
				{props.children}
			</Container>
			<Center
				as='footer'
				position='fixed'
				width='100%'
				bottom='0px'
				bg={useColorModeValue("gray.100", "gray.700")}
			>
				<Box p={6}>
					<Text fontSize='md'>nanqiang dapp - 2022</Text>
				</Box>
			</Center>
		</div>
	);
}
