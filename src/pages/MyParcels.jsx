import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyParcels = () => {
  const { user } = useAuth();

  const navigate = useNavigate()

  const { isPending, error, data } = useQuery({
    queryKey: [`/parcels`, `user=${user._id}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/parcels?user=${user._id}`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
    enabled: !!user,
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Parcel Type</TableCell>
            <TableCell>Requested Delivery Date (MM/DD/YYYY)</TableCell>
            <TableCell>Approximate Delivery Date (MM/DD/YYYY)</TableCell>
            <TableCell>Booking Date (MM/DD/YYYY)</TableCell>
            <TableCell>Delivery Men ID</TableCell>
            <TableCell>Booking Status</TableCell>
            <TableCell colSpan={4} align="center">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.parcel_type}</TableCell>
              <TableCell>
                {moment(item.requested_delivery_date).format("MM/DD/YYYY")}
              </TableCell>
              <TableCell>
                {moment(item.approximate_delivery_date).format("MM/DD/YYYY")}
              </TableCell>
              <TableCell>
                {moment(item.booking_date).format("MM/DD/YYYY")}
              </TableCell>
              <TableCell>
                {item.delivery_man ? item.delivery_man : "null"}
              </TableCell>
              <TableCell>{item.booking_status}</TableCell>
              <TableCell>
                <Stack direction={"row"} spacing={1}>
                  <Button
                    disabled={item.booking_status !== "pending"}
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/dashboard/update-parcel/${item._id}`)}
                  >
                    Update
                  </Button>
                  <Button
                    disabled={item.booking_status !== "pending"}
                    size="small"
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={item.payment_status === "paid"}
                    size="small"
                    variant="outlined"
                    color="success"
                  >
                    {item.payment_status === "paid" ? "PAID" : "PAY"}
                  </Button>
                  {item.booking_status === "delivered" && (
                    <Button size="small" variant="outlined" color="secondary">
                      Review
                    </Button>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyParcels;
