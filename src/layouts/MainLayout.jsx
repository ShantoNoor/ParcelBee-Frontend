import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Toolbar from "@mui/material/Toolbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Toolbar />
      <Home />
      <Footer />
    </>
  );
};

export default MainLayout;
