import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import CreateGameModal from "./CreateGameModal";

const CreateGameButton = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	return (
		<>
			<Button colorScheme='purple' onClick={onOpen}>
				Create a prize
			</Button>
			<CreateGameModal
				initialRef={initialRef}
				finalRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</>
	);
};

export default CreateGameButton;
