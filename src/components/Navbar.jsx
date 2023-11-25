import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import NotificationList from "./NotificationList";

const LogoIcon = styled(ShoppingBagIcon)();
const logoText = "ParcelBee";

const pages = [
  ["Home", "/"],
  ["Dashboard", "/dashboard"],
  ["Sing In", "/sign-in"],
  ["Sing Up", "/sign-up"],
];
const settings = [
  ["Profile", "/profile"],
  ["Dashboard", "/dashboard"],
  ["Account", "/account"],
  ["SignOut", "/sign-out"],
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenUserNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseUserNotification = () => {
    setAnchorElNotification(null);
  };

  const navigateHome = () => navigate("/");

  return (
    <AppBar position="sticky" >
      <Container>
        <Toolbar disableGutters={true}>
          <LogoIcon
            onClick={navigateHome}
            cursor={"pointer"}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            onClick={navigateHome}
            cursor={"pointer"}
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            {logoText}
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page[1]);
                  }}
                  selected={pathname === page[1]}
                >
                  <Typography textAlign="center">{page[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <LogoIcon
            onClick={navigateHome}
            cursor={"pointer"}
            sx={{ display: { xs: "flex", md: "none" }, mr: 1, flexGrow: {xs: 1, sm: 0} }}
          />
          <Typography
            variant="h5"
            noWrap
            onClick={navigateHome}
            cursor={"pointer"}
            sx={{
              mr: 2,
              display: { xs: 'none', sm: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {logoText}
          </Typography>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              gap: "5px",
              marginRight: "5px",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate(page[1])}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  ":hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                  backgroundColor:
                    pathname === page[1] ? "rgba(0,0,0,0.04)" : "",
                  textTransform: 'capitalize'
                }}
              >
                {page[0]}
              </Button>
            ))}
          </Box>

          {/* UserIcon */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Show Notifications">
              <IconButton
                color="inherit"
                size="large"
                onClick={handleOpenUserNotification}
                sx={{ p: 0, mr: 2 }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElNotification}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNotification)}
              onClose={handleCloseUserNotification}
            >
              <NotificationList />
            </Menu>

            <Tooltip title="Show Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: deepOrange[500] }}
                  alt="Sk"
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate(setting[1]);
                  }}
                  selected={pathname === setting[1]}
                >
                  <Typography textAlign="center">{setting[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
