import React from 'react'
import { imagePath } from '../Services/api'
import { Button, CardContent, CardMedia, Typography } from '@mui/material'
import {useMediaQuery} from '@mui/material'
import {Box} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';

export default function ({item}) {
    const isSmallScreen = useMediaQuery('(max-width:600px)')
  return (
    <>
      
        <CardMedia
                  component='img'
                  height={isSmallScreen ? '250px' : '400px'} // Adjusted height for small screens
                  width={isSmallScreen ? 'auto' : '100%'} // Adjusted width for small screens
                  image={`${imagePath}/${item.poster_path}`}
                  alt={item?.title || item?.name}
        />
       
       <CardContent sx={{display:{xs:'flex',sm:'none'},justifyContent:'center',alignItems:'center',textAlign:'center',flexDirection:'column' ,p:5}}>
          <Typography variant='h6'>
            {item?.title || item?.name}
          </Typography>
        </CardContent>
        <Box className="overlay" sx={{position:'absolute',bottom:0,left:0,width:'100%',height:'100%',bgcolor:'rgba(0,0,0,0.8)',opacity:0,transition:'opacity 0.3s ease-in-out'}} >
        <CardContent sx={{display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',flexDirection:'column',py:5}}>
          <Typography variant='h4' sx={{display:{xs:'none',sm:'block'}}}>
            {item?.title || item?.name}
          </Typography>
          <Typography sx={{fontSize:'32px'}}>
            <StarIcon/>
          </Typography>
          <Typography sx={{fontSize:'32px'}}>
            {item?.vote_average !== 0 ? item?.vote_average.toFixed(1) : "Unknown"}/10
          </Typography>
          <Typography  sx={{fontSize:'32px'}}>
            {item?.media_type==='movie'?'Movie':'Tv Show'}
          </Typography>
          <Button variant='contained' sx={{position:'absolute', bottom:30}}>
            View Details
          </Button>
          </CardContent>
          </Box>  
    </>
  )
}
