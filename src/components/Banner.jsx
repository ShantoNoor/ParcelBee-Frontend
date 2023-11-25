import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { Container } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

const Banner = () => {
  const [st, sst] = useState('')

  return (
    <Box
      sx={{
        background:
          "url(https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-delivery-banner-poster-background-image_12237.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "70vh",
        }}
      >
        <Typography variant="h1">Track Your Parcel</Typography>
        <TextField
          fullWidth
          label="Type Your Order ID ..."
          sx={{ display: "block", marginBottom: "10px" }}
          variant="filled"
          onChange={(e) => sst(e.target.value)}
        />
        <Box align="center">
          <Button size="large" variant="contained"
            onClick={() => {
              // TODO: add code for search 
              console.log(st) 
            }}
          >
            Track Parcel
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
