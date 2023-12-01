import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";

const AllDeliveryMan = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["/users/delivery_man"],
    queryFn: async () => {
      return (await axiosn.get("/users/delivery_man")).data;
    },
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Delivery Man Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Number of parcel delivered</TableCell>
            <TableCell>Average review</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.delivered}</TableCell>
              <TableCell>{item.avg_rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllDeliveryMan;
