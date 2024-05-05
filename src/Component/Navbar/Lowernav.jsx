import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Fullscreen } from '@mui/icons-material';

export default function Lowernav() {
    const actions = [
        { icon: <MovieFilterIcon />, name: 'movie' },
        { icon: <LiveTvIcon />, name: 'TvShow' },
        { icon: <HomeIcon />, name: 'Home' },
        { icon: <AccountCircleIcon />, name: 'account' },
    ];

    return (
        <Box sx={{ height: '100%', transform: 'translateZ(0px)', flexGrow: 1, display: { xs: 'block', sm: 'none' } }}>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
