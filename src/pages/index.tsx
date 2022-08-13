import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { VStack, Heading, Box, LinkOverlay, LinkBox } from "@chakra-ui/layout";
import { Text, Button } from "@chakra-ui/react";
import { ethers, Contract } from "ethers";
import { useEffect, useState } from "react";

import SoccerGamblingContract from "abi/SoccerGambling.json";

declare let window: any;

const Home: NextPage = () => {
	const createGamble = async () => {
		const title = "Spain vs France";
		const description =
			"Spain-France | UEFA Nations League 2021, who will won?";
		const expiredAt = 1662940800; // 2022-09-12
		const options = {
			optionA: "A. Spain",
			optionB: "B. France",
		};
		const rate = {
			rateA: 1,
			rateB: 2,
		};
		const value = ethers.utils.parseEther("102");

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();

		const soccerGablingContract = new ethers.Contract(
			SoccerGamblingContract.address,
			SoccerGamblingContract.abi,
			signer
		);

		await soccerGablingContract.createGamble(
			title,
			description,
			options,
			rate,
			expiredAt,
			{
				value,
			}
		);
	};

	const getGambles = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();

		const soccerGablingContract = new ethers.Contract(
			SoccerGamblingContract.address,
			SoccerGamblingContract.abi,
			signer
		);

		const list = await soccerGablingContract.getGambleList();
		console.log(list);
	};

	return (
		<>
			<Head>
				<title>My DAPP</title>
			</Head>

			<Heading as='h3' my={4}>
				Explore Web3
			</Heading>
			<Box mb={4}>
				<Button onClick={createGamble}>Create a gamble</Button>
			</Box>
			<Box>
				<Button onClick={getGambles}>Get gamble list</Button>
			</Box>
			<VStack>
				<Box my={4} p={4} w='100%' borderWidth='1px' borderRadius='lg'>
					<Heading my={4} fontSize='xl'>
						Task 1
					</Heading>
					<Text>local chain with hardhat</Text>
				</Box>

				<Box my={4} p={4} w='100%' borderWidth='1px' borderRadius='lg'>
					<Heading my={4} fontSize='xl'>
						Task 2
					</Heading>
					<Text>DAPP with React/NextJS/Chakra</Text>
				</Box>

				<LinkBox my={4} p={4} w='100%' borderWidth='1px' borderRadius='lg'>
					<NextLink
						href='https://github.com/NoahZinsmeister/web3-react/tree/v6'
						passHref
					>
						<LinkOverlay>
							<Heading my={4} fontSize='xl'>
								Task 3 with link
							</Heading>
							<Text>Read docs of Web3-React V6</Text>
						</LinkOverlay>
					</NextLink>
				</LinkBox>
			</VStack>
		</>
	);
};

export default Home;
