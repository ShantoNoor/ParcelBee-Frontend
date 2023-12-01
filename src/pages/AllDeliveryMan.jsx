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

const AllDeliveryMan = () => {
  const { data } = useQuery({
    queryKey: ["/parcels/dm"],
    queryFn: async () => {
      return (await axiosn.get("/parcels/dm")).data;
    },
  });

  console.log(data);
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
          {[].map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.user.name}</TableCell>
              <TableCell>{item.user.phone}</TableCell>
              <TableCell>
                {moment(item.booking_date).format("MM/DD/YYYY")}
              </TableCell>
              <TableCell>
                {moment(item.requested_delivery_date).format("MM/DD/YYYY")}
              </TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.booking_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllDeliveryMan;
