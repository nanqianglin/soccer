import React from "react";
import { VStack, Heading, Box, LinkOverlay, LinkBox } from "@chakra-ui/layout";
import { Text, Button, Flex } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
	item: any;
}

const GameItems = ({ item }: Props) => {
	return (
		<Box my={4} p={4} w='100%' borderWidth='1px' borderRadius='lg'>
			<Flex alignItems='center' justifyContent='space-between'>
				<Box>
					<Heading my={4} fontSize='xl'>
						{item.gambleInfo.title}
					</Heading>
					<Text>{item.gambleInfo.description}</Text>
				</Box>
				<LinkBox>
					<NextLink href={`/details/${item.id}`} passHref>
						<Button colorScheme='purple'>Details</Button>
					</NextLink>
				</LinkBox>
			</Flex>
		</Box>
	);
};

export default GameItems;
