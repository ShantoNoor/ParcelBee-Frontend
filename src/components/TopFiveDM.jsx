import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { axiosn } from "../hooks/useAxios";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { deepOrange } from "@mui/material/colors";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const TopFiveDM = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["/delivery_man_top_five"],
    queryFn: async () => {
      return (await axiosn.get("/delivery_man_top_five")).data;
    },
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <Container component="main" sx={{marginTop: "8rem"}}>
      <Typography mt={4} variant="h2" component="h2" fontWeight="bold">
        Our Top Five Delivery Man
      </Typography>
      <Divider />
      <Grid
        mt={1}
        container
        spacing={5}
        alignItems="stretch"
        justifyContent="center"
      >
        {data.map((dm) => (
          <Grid item key={dm._id} lg={4} md={6} sm={12} xs={12}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Stack justifyItems="center" alignItems="center" spacing={1}>
                  <Avatar
                    variant="square"
                    sx={{ bgcolor: deepOrange[500], height: 300, width: 300 }}
                    alt={dm.name}
                    src={dm.photo || dm.name}
                  />
                  <Typography component="span" variant="h6">
                    {dm.name}
                  </Typography>
                </Stack>
                <Divider />
                <Stack mt={1} direction={"row"} spacing={1}>
                  <LocalMallIcon color="error" />
                  <Typography
                    component="span"
                    variant="body1"
                    fontSize={"18px"}
                    align="left"
                  >
                    Parcel Delivered: {dm.delivered}
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={0.5}>
                  <StarIcon color="warning" />
                  <Typography
                    component="span"
                    variant="body1"
                    fontSize={"18px"}
                  >
                    Average Rating: {dm.avg_rating}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TopFiveDM;
