import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import GoogleIcon from "@mui/icons-material/Google";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googlePopUp } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  const redirectAfterLogin = () => {
    if (state?.pathname) {
      return navigate(state.pathname, {
        state: { title: state.title },
      });
    } else {
      return navigate("/");
    }
  };

  return (
    <Stack spacing={1}>
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={() => {
          googlePopUp().then(() => redirectAfterLogin());
        }}
      >
        Sign in with Google
      </Button>
    </Stack>
  );
};

export default SocialLogin;
