import React from 'react'
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import {  Button, Toolbar, Typography } from '@mui/material';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { useTheme } from '@emotion/react';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from 'react-router-dom'

export default function Nav_bar({ toggleDarkMode,darkMode }) {
  const theme=useTheme()
  const actions = [
    { icon: <MovieFilterIcon />, name: 'movie' },
    { icon: <LiveTvIcon/>, name: 'TvShow' },
    { icon: <HomeIcon/>, name: 'Home' },
    { icon: <AccountCircleIcon/>, name: 'account' },
  ];
  return (
   <>
    <AppBar sx={{ backgroundColor: theme.palette.background.default }}>
      <Container >
        <Toolbar >
          <LiveTvIcon sx={{ mr:1, color: theme.palette.text.primary }}/>
          <Typography variant='h5' noWrap component={Link}  to='/'
          sx={{
            mr:2,
            color: theme.palette.text.primary }}>
            MovieManic
          </Typography>
          <div >
            <div className="container mx-auto px-4">
              <ul className='flex items-center justify-center'>
                <li className='mx-2'>
                  <Typography variant='h6' component={Link} to='/movies' sx={{color:theme.palette.text.primary,display: { xs: 'none', sm: 'block' }}}>Movies</Typography>
                </li>
                <li className='mx-2' >
                  <Typography variant='h6' component={Link} to='/tv-shows' sx={{color:theme.palette.text.primary,display: { xs: 'none', sm: 'block' }}}>TvShows</Typography>
                </li>
              </ul>
            </div>
          </div>
          
          <div className='float-end absolute right-0'>
              <Button onClick={toggleDarkMode} >
                 <Typography variant='h5' sx={{ color:theme.palette.text.primary}}>
                     {darkMode?<Brightness5Icon/>:<Brightness4Icon/>}
                  </Typography>
              </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
    <Box sx={{ height:'100vh', transform: 'translateZ(0px)', flexGrow: 1,display:{xs:'block',sm:'none'} }}>
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
   </>
  )
}
