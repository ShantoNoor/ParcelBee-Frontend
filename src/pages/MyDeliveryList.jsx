import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Spinner from "../components/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import { forwardRef, useState } from "react";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyDeliveryList = () => {
  useTitle("My Delivery List");
  const { user } = useAuth();

  const { data, isPending, error } = useQuery({
    queryKey: [`parcels`, `delivery_man=${user._id}`],
    queryFn: async () => {
      return (await axiosn.get(`/parcels?delivery_man=${user._id}`)).data;
    },
  });

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

  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [item_data, setItem_data] = useState(null);

  const handleClickOpen = (item) => {
    setItem_data(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Booked User Name</TableCell>
              <TableCell>Booked User Phone</TableCell>
              <TableCell>Receivers Name</TableCell>
              <TableCell>Recievers Phone Number</TableCell>
              <TableCell>Receivers Address</TableCell>
              <TableCell>Requested Delivery Date (MM/DD/YYYY)</TableCell>
              <TableCell>Approximate Delivery Date (MM/DD/YYYY)</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.user.name}</TableCell>
                <TableCell>{item.user.phone}</TableCell>
                <TableCell>{item.user.receiver_name}</TableCell>
                <TableCell>{item.receiver_phone}</TableCell>
                <TableCell>{item.delivery_address}</TableCell>
                <TableCell>
                  {moment(item.requested_delivery_date)
                    .utc()
                    .format("MM/DD/YYYY")}
                </TableCell>
                <TableCell>
                  {moment(item.approximate_delivery_date)
                    .utc()
                    .format("MM/DD/YYYY")}
                </TableCell>
                <TableCell>
                  <Stack direction={"row"} spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setText("Deliver");
                        handleClickOpen(item);
                      }}
                      disabled={item.booking_status !== "on_the_way"}
                    >
                      Deliver
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setText("Cancel");
                        handleClickOpen(item);
                      }}
                      disabled={item.booking_status !== "on_the_way"}
                    >
                      Cancel
                    </Button>
                    <Button size="small" variant="outlined">
                      View Location
                    </Button>
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
          {`Are You sure you want to ${text} this parcel?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              if (text === "Deliver") {
                item_data.booking_status = "delivered";
                item_data.delivery_date = moment(Date.now()).utc().format();
              } else {
                item_data.booking_status = "cancelled";
              }
              mutation.mutate(item_data);
              handleClose();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyDeliveryList;
