import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import ReviewCard from "../components/ReviewCard";
import { Grid } from "@mui/material";

const MyReviews = () => {
  const { user } = useAuth();

  const { data, isPending, error } = useQuery({
    queryKey: [
      `parcels`,
      `delivery_man=${user._id}`,
      `booking_status=delivered`,
    ],
    queryFn: async () => {
      return (
        await axiosn.get(
          `/parcels?delivery_man=${user._id}&booking_status=delivered`
        )
      ).data;
    },
  });

  // const filteredData = data.map(d => )

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <Grid container spacing={2}>
      {data.filter(review => review.rating).map((review) => (
        <Grid item key={review._id} sm={12} md={6} lg={4}>
          <ReviewCard data={review} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MyReviews;
