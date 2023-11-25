import Box from "@mui/material/Box";
import Banner from "../components/Banner";
import Features from "../components/Features";

const Home = () => {
  return (
    <>
      <Banner />
      <Box my={8}>
        <Features />
      </Box>
    </>
  );
};

export default Home;
