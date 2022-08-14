import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

const RevealGameButton = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button colorScheme='purple' onClick={onOpen}>
				Reveal the game
			</Button>
		</>
	);
};

export default RevealGameButton;
