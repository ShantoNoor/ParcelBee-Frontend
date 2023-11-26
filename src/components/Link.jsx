import { Link as RouterLink } from "react-router-dom";
import MuiLink from "@mui/material/Link";

const Link = ({ children, underline, to }) => {
  // const  = props;

  return (
    <RouterLink to={to} style={{textDecoration: 'none'}}>
      <MuiLink underline={underline}>{children}</MuiLink>
    </RouterLink>
  );
};

export default Link;
