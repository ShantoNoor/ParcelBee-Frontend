import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MailLockIcon from "@mui/icons-material/MailLock";
import PeopleIcon from "@mui/icons-material/People";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import CountUp from "react-countup";
import Stack from "@mui/material/Stack";

/* TODO: fetch stats from db and show */

const tiers = [
  {
    title: "Parcel Safety",
    show: <MailLockIcon sx={{ fontSize: "5rem" }} />,
    description:
      "Ensuring peace of mind with top-tier security measures. Your parcels are safeguarded throughout the journey with state-of-the-art encryption and robust handling protocols.",
  },
  {
    title: "Real-Time Tracking",
    show: <NotListedLocationIcon sx={{ fontSize: "5rem" }} />,
    description:
      "Stay informed every step of the way. Track your parcels in real-time with precision and ease. Know exactly where your delivery is with our seamless tracking system.",
  },
  {
    title: "Super Fast Delivery",
    show: <LocalShippingIcon sx={{ fontSize: "5rem" }} />,
    description:
      "Speed redefined. Experience lightning-fast delivery options tailored to your needs. Get your parcels swiftly with our expedited shipping, promising unparalleled efficiency.",
  },
  {
    title: "Total Parcel Booked",
    show: (
      <Stack
        direction={"row"}
        justifyContent="space-evenly"
        alignItems="center"
        spacing={4}
      >
        <BookmarkIcon sx={{ fontSize: "56px" }} color="primary" />
        <CountUp
          start={0}
          end={100}
          enableScrollSpy={true}
          scrollSpyOnce={true}
          duration={2}
        />
      </Stack>
    ),
  },
  {
    title: "Total Parcel Delivered",
    show: (
      <Stack
        direction={"row"}
        justifyContent="space-evenly"
        alignItems="center"
        spacing={4}
      >
        <DeliveryDiningIcon sx={{ fontSize: "56px" }} color="primary" />
        <CountUp
          start={0}
          end={50}
          enableScrollSpy={true}
          scrollSpyOnce={true}
          duration={2}
        />
      </Stack>
    ),
  },
  {
    title: "Total Registered Users",
    show: (
      <Stack
        direction={"row"}
        justifyContent="space-evenly"
        alignItems="center"
        spacing={4}
      >
        <PeopleIcon sx={{ fontSize: "56px" }} color="primary" />
        <CountUp
          start={0}
          end={20}
          enableScrollSpy={true}
          scrollSpyOnce={true}
          duration={2}
        />
      </Stack>
    ),
  },
];
const Features = () => {
  return (
    <Container component="main">
      <Grid container spacing={5} alignItems="flex-end">
        {tiers.map((tier) => (
          <Grid item key={tier.title} xs={12} md={4}>
            <Card>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    {tier.show}
                  </Typography>
                </Box>
                {tier.description && (
                  <Typography component="p" variant="body1" align="left">
                    {tier.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
