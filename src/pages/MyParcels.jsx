import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyParcels = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axiosn.put(`/parcels/${data._id}`, data);
        if (res.status === 200) {
          toast.success("Operation Successful");
          queryClient.invalidateQueries({
            queryKey: ["/parcels", `_id=${data._id}`],
          });
        }
      } catch (err) {
        toast.error("Operation Unsuccessful");
        console.error(err);
      }
    },
  });

  const { register, handleSubmit, control, setValue } = useForm({});

  const [open, setOpen] = useState(false);
  const [item_data, setItem_data] = useState(null);

  const handleClickOpen = (item) => {
    setItem_data(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = useState(false);
  const [item_data2, setItem_data2] = useState(null);

  const handleClickOpen2 = (item) => {
    setValue("delivery_man", item?.delivery_man);
    setValue("rating", item?.rating);
    setValue("review", item?.review);
    setItem_data2(item);
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const formSubmit = async (data) => {
    item_data2.rating = data.rating;
    item_data2.review = data.review;
    item_data2.review_giving_date = moment(Date.now()).utc().format();
    mutation.mutate(item_data2);
    handleClose2();
  };

  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
  }, [user, setValue]);

  const [filter_booking_status, setFilter_booking_status] = useState("all");

  const { isPending, error, data, refetch } = useQuery({
    queryKey: [`/parcels`, `user=${user._id}`, `booking_status=${filter_booking_status}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/parcels?user=${user._id}&booking_status=${filter_booking_status}`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
    enabled: !!user,
  });

  const handleChange = (event) => {
    const filter = event.target.value;
    setFilter_booking_status(filter);
    refetch()
  };

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Booking Status
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={filter_booking_status}
          onChange={handleChange}
          label="Booking Status"
        >
          {/* "pending", "on_the_way", "delivered", "returned", "cancelled" */}
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="on_the_way">On The Way</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
          <MenuItem value="returned">Returned</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
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
                      onClick={() =>
                        navigate(`/dashboard/update-parcel/${item._id}`)
                      }
                    >
                      Update
                    </Button>
                    <Button
                      disabled={item.booking_status !== "pending"}
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleClickOpen(item)}
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={
                        item.booking_status === "returned" ||
                        item.booking_status === "cancelled" ||
                        item.payment_status === "paid"
                      }
                      size="small"
                      variant="outlined"
                      color="success"
                    >
                      {item.payment_status === "paid" ? "PAID" : "PAY"}
                    </Button>
                    {item.booking_status === "delivered" && (
                      <Button
                        size="small"
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleClickOpen2(item)}
                      >
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Are You sure you want to cancel this parcel?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              item_data.booking_status = "cancelled";
              mutation.mutate(item_data);
              handleClose();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Leave a review</DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            onSubmit={handleSubmit(formSubmit)}
            sx={{ width: "100%" }}
            spacing={2}
          >
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              {/* name */}
              <Box flex={1}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Your Name"
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register("name")}
                />
              </Box>
              {/* email */}
              <Box flex={1}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Your Email Address"
                  autoComplete="email"
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register("email")}
                />
              </Box>
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              {/* dm_id */}
              <Box flex={1}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Delivery Man's Id"
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register("delivery_man")}
                />
              </Box>
            </Stack>

            <Stack direction={{ xs: "column", md: "column" }} spacing={2}>
              <Box textAlign={"center"} pt={2} flex={1}>
                <Controller
                  name="rating"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>Rating</FormLabel>
                      <Rating
                        value={field.value}
                        size="large"
                        onChange={(_, newValue) => {
                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                  )}
                />
                <Divider sx={{ borderColor: "gray" }} />
              </Box>
              <Box flex={1}>
                <TextField
                  id="standard-multiline-static"
                  label="Review"
                  multiline
                  fullWidth
                  rows={3}
                  variant="standard"
                  {...register("review")}
                />
              </Box>
            </Stack>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyParcels;
