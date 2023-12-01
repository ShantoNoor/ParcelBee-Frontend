import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

import { DatePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";
import { axiosn } from "../hooks/useAxios";
import toast from "react-hot-toast";
import moment from "moment";

const BookParcel = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      price: 0,
      requested_delivery_date: moment(Date.now()).utc(),
    },
  });

  const formSubmit = async (data) => {
    data.user = user._id;
    data.requested_delivery_date = data.requested_delivery_date.utc().format();
    try {
      const res = await axiosn.post("/parcels", data);
      if (res.status === 201) {
        toast.success("Parcel Added Successfully");
        reset();
      }
    } catch (err) {
      toast.error("Unable to Add Parcel");
      console.error(err);
    }
  };

  const watch_weight = watch("parcel_weight");

  const updatePrice = (watch_weight) => {
    const value = watch_weight
      ? watch_weight <= 2
        ? watch_weight * 50
        : 150
      : 0;
    return value;
  };

  useEffect(() => {
    setValue("price", updatePrice(watch_weight));
  }, [watch_weight, setValue]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(formSubmit)}
      sx={{ mt: 1, width: "100%" }}
    >
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          {/* Parcel Type */}
          <Box flex={1}>
            <TextField
              variant="standard"
              fullWidth
              label="Parcel Type"
              autoFocus
              type="text"
              {...register("parcel_type", {
                required: "Parcel Type is required",
              })}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.parcel_type?.message}
            </Typography>
          </Box>
          {/* Parcel Weight */}
          <Box flex={1}>
            <TextField
              variant="standard"
              fullWidth
              label="Parcel Weight"
              type="number"
              {...register("parcel_weight", {
                required: "Parcel Weight is required",
                min: {
                  value: 0,
                  message: "Parcel Weight must be greater than 0",
                },
              })}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.parcel_weight?.message}
            </Typography>
          </Box>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/,
                  message: "Enter a valid email.",
                },
              })}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.email?.message}
            </Typography>
          </Box>
          {/* name */}
          <Box flex={1}>
            <TextField
              variant="standard"
              fullWidth
              label="Your Name"
              InputProps={{
                readOnly: true,
              }}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name shoud have at least 3 characters",
                },
              })}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.name?.message}
            </Typography>
          </Box>
          {/* phone */}
          <Box flex={1}>
            <TextField
              variant="standard"
              fullWidth
              label="Your Phone Number"
              type="tel"
              defaultValue={user.phone}
              {...register("phone", {
                required: "Phone Number is required",
                pattern: {
                  value: /^\d{6,14}$/,
                  message: "Enter a valid phone number.",
                },
              })}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.phone?.message}
            </Typography>
          </Box>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          {/* receiver_name */}
          <Box flex={2}>
            <TextField
              variant="standard"
              fullWidth
              label="Receiver's Name"
              {...register("receiver_name", {
                required: "Receiver's Name is required",
                minLength: {
                  value: 3,
                  message: "Name shoud have at least 3 characters",
                },
              })}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.receiver_name?.message}
            </Typography>
          </Box>
          {/* receiver_phone */}
          <Box flex={1}>
            <TextField
              variant="standard"
              fullWidth
              label="Receiver's Phone Number"
              type="tel"
              {...register("receiver_phone", {
                required: "Receiver's Phone Number is required",
                pattern: {
                  value: /^\d{6,14}$/,
                  message: "Enter a valid phone number.",
                },
              })}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.receiver_phone?.message}
            </Typography>
          </Box>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          {/* Parcel Delivery Address */}
          <Box flex={1}>
            <TextField
              variant="standard"
              fullWidth
              label="Parcel Delivery Address"
              type="text"
              {...register("delivery_address", {
                required: "Parcel Delivery Address is required",
              })}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.delivery_address?.message}
            </Typography>
          </Box>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          {/* Parcel Delivery Address Latitude */}
          <Box flex={1}>
            <TextField
              variant="standard"
              fullWidth
              label="Parcel Delivery Address Latitude"
              type="number"
              {...register("address_latitude", {
                required: "Parcel Delivery Address Latitude is required",
                min: {
                  value: -90,
                  message: "Latitude value must be between -90 and 90",
                },
                max: {
                  value: 90,
                  message: "Latitude value must be between -90 and 90",
                },
              })}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.address_latitude?.message}
            </Typography>
          </Box>

          {/* Parcel Delivery Address Longitude */}
          <Box flex={1}>
            <TextField
              variant="standard"
              fullWidth
              label="Parcel Delivery Address Longitude"
              type="text"
              {...register("address_longitude", {
                required: "Parcel Delivery Address Longitude is required",
                min: {
                  value: -180,
                  message: "Longitude value must be between -180 and 180",
                },
                max: {
                  value: 180,
                  message: "Longitude value must be between -180 and 180",
                },
              })}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.address_longitude?.message}
            </Typography>
          </Box>
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Box flex={1}>
            <TextField
              variant="standard"
              fullWidth
              label="Price (Taka)"
              type="number"
              value={updatePrice(watch_weight)}
              {...register("price")}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
          <Box flex={1}>
            <Controller
              name="requested_delivery_date"
              control={control}
              defaultValue={null}
              rules={{
                required: "Requested Delivery Date is required",
              }}
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
                  label="Requested Delivery Date"
                  render={(params) => <TextField {...params} />}
                  disablePast={true}
                />
              )}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.requested_delivery_date?.message}
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Book
      </Button>
    </Box>
  );
};

export default BookParcel;
