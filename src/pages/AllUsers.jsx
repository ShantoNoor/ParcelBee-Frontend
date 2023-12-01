import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { useState } from "react";

const AllUsers = () => {
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const {
    isPending,
    error,
    data: users_data,
    refetch,
  } = useQuery({
    queryKey: [`/users_stats`, `page=${page}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/users_stats?page=${page}`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  console.log(users_data)

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Number of Parcel Booked</TableCell>
              <TableCell>Total Spent Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users_data.data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.booked}</TableCell>
                <TableCell>{item.total_price}</TableCell>
                <TableCell>
                  <Stack direction={"row"} spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={async () => {
                        await axiosn.put("/users", {
                          _id: item._id,
                          status: "delivery_man",
                        });
                        toast.success("Operation Successful");
                        refetch();
                      }}
                    >
                      Make Delivery Man
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={async () => {
                        await axiosn.put("/users", {
                          _id: item._id,
                          status: "admin",
                        });
                        toast.success("Operation Successful");
                        refetch();
                      }}
                    >
                      Make Admin
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        rowsPerPage={5}
        // onRowsPerPageChange={() => }
        component="div"
        count={users_data.total_count} // total count
        page={page} // current page
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default AllUsers;

// TODO: pagination
