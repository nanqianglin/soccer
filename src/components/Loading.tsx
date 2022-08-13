import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
	return (
		<Box textAlign='center' mt='100px'>
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='blue.500'
				size='xl'
			/>
		</Box>
	);
};

export default Loading;
