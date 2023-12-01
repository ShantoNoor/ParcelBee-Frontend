import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Spinner from "../components/Spinner";

const AllUsers = () => {
  const {
    isPending,
    error,
    data: users_data,
  } = useQuery({
    queryKey: [`/users_stats`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/users_stats`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Number of Parcel Booked</TableCell>
            <TableCell>Total Spent Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users_data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.booked}</TableCell>
              <TableCell>{item.total_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllUsers;

// TODO: pagination