import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

function ProfileMenu({ iconStyles, buttonStyles }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // Function to open the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle the logout action
  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      handleClose();
      navigate("/authentication/signin");
      window.location.reload(); // ensures clean reload
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div>
      <IconButton
        sx={buttonStyles}
        size="small"
        disableRipple
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Icon sx={iconStyles}>account_circle</Icon>
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "account-menu-button",
        }}
        // These props help position the menu correctly below the icon
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

// Typechecking for the props
ProfileMenu.propTypes = {
  iconStyles: PropTypes.object.isRequired,
  buttonStyles: PropTypes.object.isRequired,
};

export default ProfileMenu;
