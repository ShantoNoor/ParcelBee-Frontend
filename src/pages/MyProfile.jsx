import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import SelectFormField from "../components/SelectFormField";

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const MyProfile = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({});

  const formSubmit = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("status", user.status);
  }, [user, setValue]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(formSubmit)}
      sx={{ mt: 1, width: "100%" }}
    >
      <Stack spacing={2}>
        <Box>
          <TextField
            variant="standard"
            fullWidth
            label="Name"
            autoFocus
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

        <Box>
          <TextField
            variant="standard"
            fullWidth
            label="Email Address"
            autoComplete="email"
            InputProps={{ readOnly: true }}
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

        <Box>
          <TextField
            variant="standard"
            fullWidth
            label="Phone Number"
            type="tel"
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

        <Box>
          <SelectFormField
            control={control}
            name={"status"}
            label={"Profile Status"}
            options={[
              { value: "user", label: "User" },
              { value: "delivery_man", label: "Delivery Man" },
            ]}
          />
        </Box>

        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
        >
          Upload Profile Picture
          <VisuallyHiddenInput type="file" {...register('photo')} />
        </Button>

        <Button type="submit" fullWidth variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default MyProfile;
