import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "./Link";
import { Link as _Link } from "react-router-dom";
import styled from "@emotion/styled";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const LogoIcon = styled(ShoppingBagIcon)();
const logoText = "ParcelBee";

const Footer = () => {
  return (
    <Paper variant="outlined" square>
      <Container>
        <Box>
          <Stack direction={{ md: "row" }} gap={5} my={2}>
            <Box flex={1}>
              <Box
                display={"flex"}
                gap={1}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <LogoIcon
                  // onClick={navigateHome}
                  cursor={"pointer"}
                  sx={{ fontSize: { md: "3rem", xs: "2rem" } }}
                />
                <Typography
                  variant="h6"
                  mb={1}
                  fontSize={{ md: "2rem", xs: "1rem" }}
                  // onClick={navigateHome}
                >
                  {logoText}
                </Typography>
              </Box>

              <Stack direction={"column"} divider={<Divider variant="middle" />} p={1}>
                <Link>Home</Link>
                <Link>About</Link>
                <Link>Contact Us</Link>
                <Link>Sign Up</Link>
              </Stack>
            </Box>
            <Box flex={2}>
              <Typography variant="h6" mb={1}>
                Subscribe to Newletter
              </Typography>
              <Box>
                <TextField
                  size="small"
                  fullWidth
                  label="Email"
                  id="fullWidth"
                />
              </Box>
              <Box align="center" mt={1}>
                <Button variant="contained">Subscribe</Button>
              </Box>
            </Box>
            <Box flex={1}>
              <Typography variant="h6" mb={1}>
                Social Links
              </Typography>
              <Stack
                direction={"row"}
                gap={1}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <GoogleIcon />
                <FacebookIcon />
                <LinkedInIcon />
                <InstagramIcon />
              </Stack>
            </Box>
          </Stack>
          <Divider />
          <Copyright my={3} />
        </Box>
      </Container>
    </Paper>
  );
};

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Typography variant="span" color={"primary"}>
        <Link to={"/"}>ParcelBee</Link>{" "}
      </Typography>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Footer;
