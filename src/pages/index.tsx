import type { NextPage } from "next";
import Head from "next/head";
import { VStack, Heading, Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import useGambleList from "hooks/useGambleList";
import useCreateGamble from "hooks/useCreateGamble";
import GameItems from "components/GameItems";
import Loading from "components/Loading";

const Home: NextPage = () => {
	const { address } = useAccount();

	const { data, isLoading } = useGambleList();
	const createGambleMutation = useCreateGamble();

	const createGamble = async () => {
		createGambleMutation.mutate();
	};

	return (
		<>
			<Head>
				<title>Soccer</title>
			</Head>

			<Heading as='h2' my={4}>
				Soccer Prizes List
			</Heading>
			<Box mb={4}>
				<Button colorScheme='purple' onClick={createGamble}>
					Create a prize
				</Button>
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
