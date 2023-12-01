import Box from "@mui/material/Box";
import Banner from "../components/Banner";
import Features from "../components/Features";
import FeatureStats from "../components/FeatureStats";
import TopFiveDM from "../components/TopFiveDM";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle('Home | Parcel Bee')
  return (
    <>
      <Banner />
      <Box my={8}>
        <Features />
        <FeatureStats />
        <TopFiveDM />
      </Box>
    </>
  );
};

export default Home;
