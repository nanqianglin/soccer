import type { NextPage } from "next";
import { Heading } from "@chakra-ui/layout";

import { useRouter } from "next/router";
import useGambleDetails from "hooks/useGambleDetails";
import Loading from "components/Loading";
import GameDetails from "components/GameDetails";

const Home: NextPage = () => {
  // const { address } = useAccount();
  const router = useRouter();
  const id = Number(router.query?.id);

  const { data, isLoading } = useGambleDetails(id);

  return (
    <>
      <Heading as="h2" mt={4} mb={10}>
        Soccer Prizes Details
      </Heading>
      {(isLoading || !data) && <Loading />}
      {data && <GameDetails data={data} />}
    </>
  );
};

export default Home;
