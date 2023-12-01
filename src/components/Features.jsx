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
  }
];
const Features = () => {
  return (
    <Container component="main">
      <Grid container spacing={5} alignItems="stretch">
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
