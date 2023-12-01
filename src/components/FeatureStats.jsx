import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useQuery } from "@tanstack/react-query";

import PeopleIcon from "@mui/icons-material/People";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import CountUp from "react-countup";
import Stack from "@mui/material/Stack";
import { axiosn } from "../hooks/useAxios";
import Spinner from "./Spinner";

const FeatureStats = () => {
  const { data, isPending } = useQuery({
    queryKey: ["/home_stats"],
    queryFn: async () => (await axiosn.get("/home_stats")).data,
  });

  if(isPending) return <Spinner />

  return (
    <Container component="main">
      <Grid mt={1} container spacing={5} alignItems="stretch">
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title={"Total Parcel Booked"}
              subheader={""}
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
                  <Stack
                    direction={"row"}
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={4}
                  >
                    <BookmarkIcon sx={{ fontSize: "56px" }} color="primary" />
                    <CountUp
                      start={0}
                      end={data.booked}
                      // enableScrollSpy={true}
                      scrollSpyOnce={true}
                      duration={2}
                    />
                  </Stack>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title={"Total Parcel Delivered"}
              subheader={""}
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
                  <Stack
                    direction={"row"}
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={4}
                  >
                    <DeliveryDiningIcon
                      sx={{ fontSize: "56px" }}
                      color="primary"
                    />
                    <CountUp
                      start={0}
                      end={data.delivered}
                      // enableScrollSpy={true}
                      scrollSpyOnce={true}
                      duration={2}
                    />
                  </Stack>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title={"Total Registered Users"}
              subheader={""}
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
                  <Stack
                    direction={"row"}
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={4}
                  >
                    <PeopleIcon sx={{ fontSize: "56px" }} color="primary" />
                    <CountUp
                      start={0}
                      end={data.registered}
                      // enableScrollSpy={true}
                      scrollSpyOnce={true}
                      duration={2}
                    />
                  </Stack>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeatureStats;
