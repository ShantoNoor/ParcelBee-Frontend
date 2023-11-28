import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "../components/Link";
import Copyright from "../components/Copyright";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider, Stack } from "@mui/material";
import SocialLogin from "../components/SocialLogin";
import PersonIcon from "@mui/icons-material/Person";
import Animation from "../assets/animations/sign-up.json";

import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { axiosn } from "../hooks/useAxios";
import toast from "react-hot-toast";

const Player = React.lazy(() =>
  import("@lottiefiles/react-lottie-player").then((module) => {
    return { default: module.Player };
  })
);

export default function SignUp() {
  const [animation, setAnimation] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp, updateProfile } = useAuth();
  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formSubmit = async (data) => {
    try {
      const res = await axiosn.post("/users", data);
      if (res.status === 201) {
        await signUp(data.name, data.email, data.password);
        await updateProfile(data.name, "");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data)
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          // backgroundImage: "url(https://www.minopcloud.com/app_assets/images/signin.png)",
          // backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <React.Suspense
          fallback={
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          }
        >
          {
            <Player
              autoplay
              loop
              src={Animation}
              style={{ maxWidth: "450px" }}
            />
          }
        </React.Suspense>
      </Grid>

      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(formSubmit)}
            sx={{ mt: 1, width: "100%" }}
          >
            <Stack spacing={2}>
              <Box>
                <TextField
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
                <Typography component={"p"} color={"error"} role="alert">
                  {errors?.name?.message}
                </Typography>
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/,
                      message: "Enter a valid email.",
                    },
                  })}
                />
                <Typography component={"p"} color={"error"} role="alert">
                  {errors?.email?.message}
                </Typography>
              </Box>

              <Box>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password shoud have at least 6 characters",
                      },
                      pattern: {
                        value:
                          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]/,
                        message:
                          "Password shoud contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                      },
                    })}
                  />
                </FormControl>
                <Typography component={"p"} color={"error"} role="alert">
                  {errors?.password?.message}
                </Typography>
              </Box>

              <Box>
                <TextField
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
                <Typography component={"p"} color={"error"} role="alert">
                  {errors?.phone?.message}
                </Typography>
              </Box>
            </Stack>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link to="/sign-in" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Divider sx={{ my: 4 }} variant="middle">
              OR
            </Divider>
            <SocialLogin />
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
