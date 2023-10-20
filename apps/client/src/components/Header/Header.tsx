import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAuth, useGoogleAuth } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONFIG } from "@/routers/config";

const pages: string[] = [];

export const Header = () => {
  const { user, logout } = useAuth();
  const { isAuthenticated, logout: googleLogout } = useGoogleAuth();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    if (isAuthenticated) await googleLogout();
    logout();
  };

  const settings = [
    {
      title: "Profile",
      action: () => navigate(ROUTE_CONFIG.PROFILE.PATH),
    },
    {
      title: "Settings",
      action: () => navigate(ROUTE_CONFIG.SETTING.PATH),
    },
    {
      title: "Logout",
      action: handleLogout,
    },
  ];

  return (
    <AppBar position="static">
      <Box sx={{ mr: "10px", ml: "10px" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate(ROUTE_CONFIG.HOME.PATH)}
          >
            Dashboard
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt={user!.name}
                  src={user!.avatar}
                  sx={{ width: 36, height: 36 }}
                />
                <Typography sx={{ ml: "10px", color: "#fafafa" }}>
                  {user!.name}
                </Typography>
                <ArrowDropDownIcon sx={{ color: "#fafafa" }} />
              </Box>
            </IconButton>
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
                  key={setting.title}
                  onClick={() =>
                    typeof setting.action === "function"
                      ? setting.action()
                      : null
                  }
                >
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
