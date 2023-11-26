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
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Copyright from "./Copyright";

const LogoIcon = styled(ShoppingBagIcon)();
const logoText = "ParcelBee";

const Footer = () => {
  const navigate = useNavigate();
  const navigateHome = () => navigate("/");

  return (
    <Box
      py={2}
      sx={{
        background:
          "url(https://img.freepik.com/premium-photo/white-background-with-line-colorful-lines-that-say-smart_644836-205.jpg?w=2000)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Stack direction={{ md: "row" }} gap={5} my={2}>
          <Box flex={1}>
            <Box
              display={"flex"}
              gap={1}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <LogoIcon
                onClick={navigateHome}
                cursor={"pointer"}
                sx={{ fontSize: { xs: "3rem" }, color: (theme) => theme.palette.warning.main, }}
              />
              <Typography
                variant="h6"
                mb={1}
                fontSize={{ xs: "2rem" }}
                onClick={navigateHome}
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: (theme) => theme.palette.warning.main,
                  textDecoration: "none",
                  flexGrow: 1,
                }}
              >
                {logoText}
              </Typography>
            </Box>

            <Stack
              direction={"column"}
              divider={<Divider  />}
              p={1}
            >
              <Link to="/" underline={"hover"}>Home</Link>
              <Link underline={"hover"}>About</Link>
              <Link underline={"hover"}>Contact Us</Link>
            </Stack>
          </Box>
          <Box flex={2}>
            <Typography variant="h6" mb={1}>
              Subscribe to Newletter
            </Typography>
            <Box>
              <TextField
                size="small"
                variant="filled"
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
              <Link to='https://google.com'>
                <GoogleIcon />
              </Link>
              <Link to='https://facebook.com'>
                <FacebookIcon />
              </Link>
              <Link to='https://linkedin.com'>
                <LinkedInIcon />
              </Link>
              <Link to='https://instagram.com'>
                <InstagramIcon />
              </Link>
            </Stack>
          </Box>
        </Stack>
        <Divider />
        <Copyright my={3} />
      </Container>
    </Box>
  );
};

export default Footer;
