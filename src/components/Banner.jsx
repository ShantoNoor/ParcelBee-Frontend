import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { Container } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

const Banner = () => {
  const [st, sst] = useState('')

/* TODO: implement parcel show tracing by id */


  return (
    <Box
      sx={{
        background:
          "url(https://static.vecteezy.com/system/resources/previews/005/237/759/non_2x/delivery-man-checking-package-address-the-delivery-man-prepares-to-deliver-the-parcel-illustration-vector.jpg)",
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
          label="Type Your Parcel ID ..."
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
