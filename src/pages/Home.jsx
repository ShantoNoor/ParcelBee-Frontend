import Box from "@mui/material/Box";
import Banner from "../components/Banner";
import Features from "../components/Features";
import FeatureStats from "../components/FeatureStats";

const Home = () => {
  return (
    <>
      <Banner />
      <Box my={8}>
        <Features />
        <FeatureStats />
      </Box>
      {/* TODO: Top 5 delivery man info */}
    </>
  );
};

export default Home;
