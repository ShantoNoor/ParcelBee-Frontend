import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import GoogleIcon from "@mui/icons-material/Google";

const SocialLogin = () => {
  return (
    <Stack spacing={1}>
      <Button variant="contained" startIcon={<GoogleIcon />}>
        Sign in with Google
      </Button>
    </Stack>
  );
};

export default SocialLogin;
