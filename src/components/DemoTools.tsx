import React, { useEffect } from "react";
import { ethers } from "ethers";
import useBlockTimestamp from "hooks/useBlockTimestamp";
import moment from "moment";
import { Box, Button, Text, useToast } from "@chakra-ui/react";

async function increaseTime(day: number, toast: Function, refetch: VoidFunction) {
  const DAY_IN_SECS = day * 24 * 60 * 60;
  const provider = new ethers.providers.StaticJsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  await provider.send("evm_increaseTime", [DAY_IN_SECS]);
  await provider.send("hardhat_mine", [
    ethers.utils.hexStripZeros(ethers.BigNumber.from(1).toHexString()),
  ]);
  toast({
    title: "Congratulations!",
    description: "Increase one day for blockchain!",
    status: "success",
    duration: 2000,
    isClosable: true,
    position: "top",
  });
  refetch();
}

const DemoTools = () => {
  const toast = useToast();
  const { data: timestamp, refetch } = useBlockTimestamp();

  const handleClick = () => {
    increaseTime(1, toast, refetch);
  };
  return (
    <Box>
      <Button onClick={handleClick}>Increase one day</Button>
      <Text fontSize="sm" mt={4} color="grey.100">
        Now the time of the block chain is{" "}
        {moment(timestamp * 1000).format("MMM DD, YYYY")}
      </Text>
    </Box>
  );
};

export default DemoTools;
