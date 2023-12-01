import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { axiosn } from "../hooks/useAxios";

const MyReviews = () => {
  const { user } = useAuth();

  const { data, isPending, error } = useQuery({
    queryKey: [`parcels`, `delivery_man=${user._id}`, `booking_status=delivered`],
    queryFn: async () => {
      return (await axiosn.get(`/parcels?delivery_man=${user._id}&booking_status=delivered`)).data;
    },
  });

  // const filteredData = data.map(d => )

  console.log(data)
  return <div>MyReviews</div>;
};

export default MyReviews;
