import React, { useEffect, useState } from 'react'
import { fetchTrending,fetchDetails } from '../Services/api'
import {Grid, Skeleton, Stack} from '@mui/material'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import {Box} from '@mui/material'
import { useTheme } from '@emotion/react';
import {useMediaQuery} from '@mui/material'



import Card_Component from '../Card_Compo/Card_Component'
import { Link } from 'react-router-dom'


export default function Home({darkMode}) {
  const theme=useTheme()
  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)
  const [timeWindow, settimeWindow] = useState('day')
  const [details, setdetails] = useState({})
 

  useEffect(() => {
    setloading(true);
   fetchTrending(timeWindow).then((res)=>{
    setdata(res)
   }).catch((err)=>{
    console.log(err,'err')
   }).finally(()=>{
    setloading(false);
   })
  }, [timeWindow])
  // useEffect(()=>{
  //   setloading(true)
  //   const fetchData=async()=>{
  //     try {
  //       if (timeWindow) {
  //         const trendingData = await fetchTrending(timeWindow);
  //         setdata(trendingData);
  //       }

  //       if (type && id) {
  //         const [detailsData] = await Promise.all([
  //             fetchDetails(type, id)
  //           ])

  //           setdetails(detailsData);
  //         }    

  //     }catch (error) {
  //       console.log(error,'error')
  //     }finally {
  //       setloading(false);
  //       handleClose(); // Assuming `handleClose` is a function defined elsewhere
  //   }
  //   }
  //   fetchData();
  // },[timeWindow,type,id])

  console.log(data,'data')
  
  return (
    <>
    <Box sx={{pt:10 ,px:5}}>
      <Stack alignItems='baseline' spacing={4}>
      <Typography variant='h5'>
        Trending
      </Typography>
      <Stack alignItems='center' spacing={2} border={'1px solid #D90429'} borderRadius={'20px'} direction='row'>
          <Typography component='button' sx={{px:3 ,py:1, }} 
          // bgcolor: `${timeWindow === 'day' ? (darkMode ? theme.palette.button.default : '') : ''}`
          borderRadius={'20px'}
          bgcolor={`${timeWindow==='day'?(darkMode?theme.palette.button.default:'#8D99AE'):''}`}
          onClick={()=>{
            settimeWindow('day')
          }}>Today</Typography>
          <Typography component='button' sx={{px:3 ,py:1,}}
          bgcolor={`${timeWindow==='week'?(darkMode?theme.palette.button.default:'#8D99AE'):''}`}
          borderRadius={'20px'}         
          onClick={()=>{
            settimeWindow('week')
          }}>This Week</Typography>
      </Stack>
      </Stack>
      {/* {loading && (
      <Box sx={{ display:'flex', alignItems: 'center', justifyContent: 'center', pt: 5 }}>
        <Typography variant='h4'>Loading....</Typography>
      </Box>
      )} */}
      <Grid container spacing={2} sx={{ justifyContent: 'center' ,py:5 }}>
        {data &&
          data.map((item) => (
           loading?(
            <Grid item key={item.id} xs={12} sm={4} md={2} m={2} >
              <Card >
               <Skeleton  
                  height={isSmallScreen ? '250px' : '400px'} // Adjusted height for small screens
                  width={isSmallScreen ? 'auto' : '100%'} // Adjusted width for small screens
                  ></Skeleton>
              </Card>
            </Grid>
           ):(
            <Grid item key={item.id} xs={12} sm={4} md={2} m={2} >
              <Card sx={{ height: '100%',mb:'-25px',position:'relative',border:'2px solid #d90429', ':hover': { transform:{xs:'scale(1.0)' ,sm:'scale(1.08)'},transition: 'transform 0.3s ease-in-out','& .overlay': {
             opacity: 1
              }},
              }}
              
             >
             <Link to={`/${item?.media_type}/${item?.id}`}>
             <Card_Component item={item}/>
             </Link>
             </Card>
            </Grid>
           )
          ))}
      </Grid>
    </Box>
    
    </>
  )
}
