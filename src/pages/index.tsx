import type { NextPage } from "next";
import Head from "next/head";
import { VStack, Heading, Box } from "@chakra-ui/layout";
import { useAccount } from "wagmi";

import useGambleList from "hooks/useGambleList";
import GameItems from "components/GameItems";
import Loading from "components/Loading";
import React from "react";
import CreateGameButton from "components/CreateGame/CreateGameButton";
import { LinkBox, Button, Avatar, AvatarBadge, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import DemoTools from "components/DemoTools";

const Home: NextPage = () => {
	const { address } = useAccount();

	const { data, isLoading } = useGambleList();

	return (
		<>
			<Head>
				<title>Soccer</title>
			</Head>
			<LinkBox width='100%' sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<DemoTools />
				<NextLink href='withdraw' passHref>
					<Box>
						{/* <Avatar mt={-1} mr={4}>
							<AvatarBadge boxSize='1.25em' bg='green.500' />
						</Avatar> */}
						<Button>My Balance</Button>
					</Box>
				</NextLink>
			</LinkBox>
			<Heading as='h2' my={4}>
				Soccer Prizes List
			</Heading>
			<Box mb={4}>
				<CreateGameButton />
			</Box>
			{isLoading && <Loading />}
			<VStack>
				{data?.map((item: any) => (
					<GameItems key={item.id} item={item} />
				))}
			</VStack>
		</>
	);
};

export default Home;
