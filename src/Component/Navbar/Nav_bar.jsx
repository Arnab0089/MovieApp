import React from 'react'
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import {  Button, Toolbar, Typography } from '@mui/material';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { useTheme } from '@emotion/react';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {Link} from 'react-router-dom'
import { useAuth } from '../../context/useAuth';

export default function Nav_bar({ toggleDarkMode,darkMode }) {
  const {user,SignInWithGoogle,logOut}=useAuth()
  const theme=useTheme()
 
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
                <li className='mx-2' >
                  <Typography variant='h6' component={Link} to='/search' sx={{color:theme.palette.text.primary,display: { xs: 'none', sm: 'block' }}}>Search</Typography>
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
   
   </>
  )
}
