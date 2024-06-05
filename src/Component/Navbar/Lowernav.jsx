import React from "react";
import { Link } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Fullscreen } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

export default function Lowernav() {
  const actions = [
    { icon: <MovieFilterIcon />, name: "movie", link: "/movies" },
    { icon: <LiveTvIcon />, name: "TvShow", link: "/tv-shows" },
    { icon: <HomeIcon />, name: "Home", link: "/" },
    { icon: <SearchIcon />, name: "account", link: "/search" },
  ];

  return (
    <div className="fixed bottom-4 right-2 z-50 sm:hidden">
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={
              <Link to={action.link} style={{ color: "inherit" }}>
                {action.icon}
              </Link>
            }
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
