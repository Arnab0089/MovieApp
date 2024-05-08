import { Box, Card, Grid, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchTvSeries } from '../Services/api';
import { Link } from 'react-router-dom';
import Card_Component from '../Card_Compo/Card_Component';
import {useMediaQuery} from '@mui/material'
import Pagination from '../Pagination/Pagination';
import ApplyFilter from '../ApplyFilter/ApplyFilter';

export default function TvShows() {
  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const [shows, setshows] = useState([])
  const [loading, setloading] = useState(true)
  const [activePage, setactivePage] = useState(parseInt(localStorage.getItem('activePage')) || 1)
  const [sort, setSort] = useState(localStorage.getItem('selectedFilter') || 'popularity.desc');
  const [totalPage, settotalPage] = useState(1)
  
  useEffect(() => {
    setloading(true)
    fetchTvSeries(activePage,sort)
    .then((res)=>{
     console.log(res)
     setshows(res?.results)
     setactivePage(res?.page)
     settotalPage(res?.total_pages)
    }).catch((err)=>{
     console.log(err)
    }).finally(()=>{
     setloading(false)
    })
   }, [activePage,sort])

   useEffect(() => {
    localStorage.setItem('activePage', activePage.toString());
  }, [activePage]);
 

  return (
    <Box sx={{pt:10 ,px:5}}>
        <Stack display={'flex'} flexDirection={{xs:'column',sm:'row'}} gap={2} alignItems={'center'} justifyContent={{xs:'center',sm:'start'}}>
            <Typography variant='h5' sx={{fontStyle:'italic'}}>
              Discover Tv Shows
            </Typography>
          <ApplyFilter sort={sort} setSort={setSort} setactivePage={setactivePage}/>
        </Stack>
      <Box>
      <Grid container spacing={2} sx={{ justifyContent: 'center' ,py:5 }}>
        {shows &&
          shows.map((item) => (
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
             <Link to={`/tv/${item?.id}`}>
             <Card_Component item={item}/>
             </Link>
             </Card>
            </Grid>
           )
          ))}
      </Grid>
      </Box>
      {/* Pagination */}

          <Pagination activePage={activePage} totalPage={totalPage} setactivePage={setactivePage}/>
    </Box>
  )
}
