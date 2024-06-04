import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import ProfileMan from "../../assets/How-Do-You-Have-No-Profile-Picture-on-Facebook_25900.png";
import ProfileWoman from "../../assets/main-qimg-1664fff485408ef7ece9e82224baa5cc.png";
import { Link } from "react-router-dom";

export default function Author({ user, signInWithPopup, logOut }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup();
    } catch (error) {
      console.log(error);
    }
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
    setAnchorEl(null);
  };
  return (
    <div>
      <Avatar
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        src={user?.photoURL || ProfileMan}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {!user ? (
          <MenuItem onClick={handleGoogleLogin}>Login</MenuItem>
        ) : (
          <>
            <Link to="/watchlist">
              <MenuItem onClick={handleClose}>My Watchlist</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}
