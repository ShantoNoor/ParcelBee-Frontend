import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import moment from "moment";
import Spinner from "../components/Spinner";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import SelectFormField from "../components/SelectFormField";
import { DatePicker } from "@mui/x-date-pickers";
import toast from "react-hot-toast";

const AllParcel = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: [`/parcels`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/parcels`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  const { data: dm_data } = useQuery({
    queryKey: ["/users", "status=delivery_man"],
    queryFn: async () => {
      const res = (await axiosn.get("/users?status=delivery_man")).data;
      const ddata = res.map((dm) => {
        return { value: dm._id, label: dm.name };
      });
      return ddata;
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

  const { handleSubmit, control, setValue } = useForm({});

  const [open2, setOpen2] = useState(false);
  const [item_data2, setItem_data2] = useState(null);

  const handleClickOpen2 = (item) => {
    setValue('delivery_man', item?.delivery_man ? item.delivery_man : '')
    setValue(
      "approximate_delivery_date",
      item?.approximate_delivery_date
        ? moment(item?.approximate_delivery_date).utc()
        : null
    );

    setItem_data2(item);
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const formSubmit = async (data) => {
    setItem_data2((prev) => {
      prev.delivery_man = data.delivery_man;
      prev.approximate_delivery_date = data.approximate_delivery_date.format();
      prev.booking_status = "on_the_way";
    });

    mutation.mutate(item_data2);

    handleClose2();
  };

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>User Phone</TableCell>
              <TableCell>Booking Date (MM/DD/YYYY)</TableCell>
              <TableCell>Requested Delivery Date (MM/DD/YYYY)</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Booking Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
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
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleClickOpen2(item)}
                    disabled={item.booking_status !== 'pending'}
                  >
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Manage | Assign a Delivery Man</DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            onSubmit={handleSubmit(formSubmit)}
            sx={{ width: "100%" }}
            spacing={2}
          >
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <SelectFormField
                name={"delivery_man"}
                label={"Select a Delivery Man"}
                control={control}
                options={[{ value: "", label: "" }, ...dm_data]}
              />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              {/* dm_id */}
              <Box flex={1}>
                <Controller
                  name="approximate_delivery_date"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      sx={{ width: "100%" }}
                      slotProps={{
                        textField: {
                          variant: "standard",
                          helperText: "MM/DD/YYYY",
                        },
                      }}
                      label="Approximate Delivery Date"
                      render={(params) => <TextField {...params} />}
                      disablePast={true}
                    />
                  )}
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

export default AllParcel;
