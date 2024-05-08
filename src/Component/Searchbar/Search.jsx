import { Box, Stack, Typography, Container, Button, CircularProgress, Grid, Card, Skeleton } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import React, { useState,useEffect } from 'react';
import { searchData } from '../Services/api';
import { Link } from 'react-router-dom';
// import Card_Component from '../Card_Compo/Card_Component';
import SeacrhCard from '../Card_Compo/SeacrhCard';
import Pagination from '../Pagination/Pagination';

export default function Search() {
    const [search, setSearch] = useState('');
    const [activePage, setactivePage] = useState(1)
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState({})
    const [totalPage, settotalPage] = useState(1)
    useEffect(() => {
        setloading(true)
        
        searchData(search,activePage).then((res)=>{
            setdata(res?.results)
            setactivePage(res?.page)
            settotalPage(res?.total_pages)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setloading(false)
        })
    }, [search,activePage])
    

    const HandleOnChange = (e) => {
        setSearch(e.target.value);
        setactivePage(1);
      
    }

    const HandleOnSubmit = (e) => {
        e.preventDefault();
        
    }

    return (
        <Box sx={{ pt: 10 }}>
            <Container>
                <Stack>
                    <Typography variant='h5'>Search Here</Typography>
                </Stack>
                <Box sx={{ py: 2 }}>
                    <form onSubmit={HandleOnSubmit}>
                        <Stack
                            display={'flex'}
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            alignItems={'center'}
                            gap={2}
                        >
                            <input
                                placeholder='Search Movies, TV Shows Here'
                                style={{ padding: '12px', width: '100%', borderRadius: '5px' }}
                                onChange={HandleOnChange}
                            />
                            <Button variant='contained' sx={{ py: '10px', display: 'flex', flexDirection: 'row', gap: 1.2 }} type="submit">
                                <TravelExploreIcon />
                                <span>Search</span>
                            </Button>
                        </Stack>
                    </form>
                </Box>

                {
                    loading && (
                        <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} mt={10}>
                        <CircularProgress />
                        </Stack>
                    )
                }
                {
                    data?.length<0 && !loading && (
                        <Typography variant='h3' mt={10}>
                            No results Found
                        </Typography>
                    )
                }
                <Grid container spacing={2} sx={{ justifyContent: 'center' ,py:5 }}>
        {data?.length>0&&!loading &&
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
             <SeacrhCard item={item}/>
             </Link>
             </Card>
            </Grid>
           )
          ))}
          </Grid>
          {
            data?.length>0 && !loading &&(
                <Box py={2}>
                    <Pagination activePage={activePage} totalPage={totalPage} setactivePage={setactivePage}/>
                </Box>
            )
          }
            </Container>
        </Box>
    );
}
