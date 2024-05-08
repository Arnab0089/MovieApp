import { Backdrop, Container, Stack, Typography,CircularProgress, Button, Grid, Chip } from '@mui/material';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCredits, fetchDetails, fetchVideos } from '../Services/api';
import { imagePath } from '../Services/api'
import {CardMedia,CardContent} from '@mui/material';
import {Card }from '@mui/material';
import {useMediaQuery} from '@mui/material'
import { imagePathOriginal } from '../Services/api'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import AddIcon from '@mui/icons-material/Add';
import VideoCompo from '../VideoComponent/VideoCompo';
import ProfileMan from '../../assets/How-Do-You-Have-No-Profile-Picture-on-Facebook_25900.png'
import ProfileWoman from '../../assets/main-qimg-1664fff485408ef7ece9e82224baa5cc.png'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Show() {
    const router = useParams();
    const { type, id } = router;
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [details, setdetails] = useState({})
    const [cast, setcast] = useState([])
    const [video, setvideo] = useState(null)
    const [videos, setvideos] = useState([])
    const isSmallScreen = useMediaQuery('(max-width:600px)')



    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    // useEffect(() => {
    //     setLoading(true);
    //     handleOpen(); // Open the backdrop when starting the fetch
    //     fetchDetails(type, id)
    //         .then((res) => {
    //             console.log(res, 'res1');
    //             setdetails(res)
    //         })
    //         .catch((err) => {
    //             console.log(err, 'err');
    //         })
    //         .finally(() => {
    //             setLoading(false)
    //             // Mark loading as false when fetch is completed
    //             if (!loading) {
    //                 handleClose(); // Close the backdrop only if loading is already set to false
    //             }
    //             // Close the backdrop when fetch is completed
    //         });
    // }, [type, id]);

    useEffect(()=>{
        setLoading(true);
        handleOpen()
        const fetchData=async()=>{
            try {
                const [detailsData,creditsData,videosData]= await Promise.all([
                    fetchDetails(type,id),
                    fetchCredits(type,id),
                    fetchVideos(type,id)
                    
                ])

                // Fetch Details
                setdetails(detailsData)

                //Fetch Casting
                setcast(creditsData?.cast?.slice(0,20))

                // Set video
                const Video=videosData?.results?.find((video)=>video?.type==='Trailer')
                setvideo(Video)

                const Videos=videosData?.results?.filter((video)=>video?.type !== 'Trailer')?.slice(0,10)
                setvideos(Videos)

            } catch (error) {
                console.log(error,'error')
            }finally{
                setLoading(false)
                if (!loading) {
                    handleClose()
                  }
            }
        }
        fetchData();
    },[type,id])

    

    const title=details?.title||details?.name
    const releaseDate=type==='tv'?details?.first_air_date:details?.release_date

    const formatDate = (releaseDate) => {
        const date = new Date(releaseDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const year = date.getFullYear();
    
        // Pad single-digit day and month with leading zero if necessary
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
    
        return `${formattedDay}-${formattedMonth}-${year}`;
    };
    //  formatDate(releaseDate)

    const minToHours=(minutes)=>{
        const hours=Math.floor(minutes/60)
        const min=(minutes%60)
         
        return`${hours} hour  ${min } min`
    }

    return (
        <>
        <Box sx={{ my: 10, mx: 5 ,py:2,
            background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url(${imagePathOriginal}/${details?.backdrop_path}})`,
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            borderRadius:'20px'
            
        }}
        >
            {loading && (
                <Stack justifyContent='center'>
                    <Backdrop open={open} onClick={handleClose}>
                        <CircularProgress />
                    </Backdrop>
                </Stack>
            )}
            {/* Render your content here */}
            <Container>
               <Grid   container spacing={2} columns={16}>
               <Grid item xs={16} sm={8}>
               <Stack alignItems='center'  gap='10' flexDirection={{xs:'column',sm:'row'}} >
                    <Card sx={{borderRadius:'20px' ,border:'2px solid #d90429'}}>
                    <CardMedia
                     component='img'
                     height={isSmallScreen ? '300px' : '450px'}// Adjusted height for small screens

                        image={`${imagePath}/${details?.poster_path}`}

                    />
                    </Card>
                </Stack>
               </Grid>
              <Grid item xs={16} sm={8}>
              <Box mx={{xs:0,sm:7,md:12}} >
                    <Typography variant={isSmallScreen ? 'h6' : 'h3'} py={2} fontWeight={'bold'} textAlign={'center'}>
                        {title} {new Date(releaseDate).getFullYear() }
                    </Typography>
                    <Box variant={isSmallScreen ? 'h6' : 'h3'} py={2}>
                        <Stack display='flex' flexDirection='row' alignItems='center' px={3} gap={3}>
                            <CalendarMonthIcon  sx={{ fontSize: isSmallScreen ? '16px' : '24px' }}/>
                            <Typography variant={isSmallScreen ? 'h6' : 'h5'} >
                                {new Date(releaseDate).toLocaleDateString('en-US')}(US)
                            </Typography>
                        </Stack>
                      {
                        type==='movie'&& (
                            <Stack display='flex' flexDirection='row' alignItems='center' py={3} px={3} gap={3}>
                                <AccessTimeIcon sx={{ fontSize: isSmallScreen ? '16px' : '24px' }}/>
                                <Typography  variant={isSmallScreen ? 'h6' : 'h5'}  >
                                    {minToHours(details?.runtime)}
                                </Typography>
                            </Stack>
                        )
                      }
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
                        <Stack  alignItems='baseline' gap={4} pl={5} py={3}>
                            <Box sx={{ position: 'relative', display: 'inline-flex' }} >
                            <CircularProgress variant="determinate" color='error' value= {details?.vote_average && details.vote_average.toFixed(1)*10} size={'50px'} sx={{zIndex:12}} />
                            <Box
                                sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                
                                }}
                                border={'4px solid #fff'} borderRadius={'50px'}
                            >
                                <Typography  sx={{ fontSize: isSmallScreen ? '16px' : '22px' }}>
                                {details?.vote_average && details.vote_average.toFixed(1)*10}
                                </Typography>
                            </Box>
                                
                            </Box>
                        </Stack>
                        <Stack gap={5} display={'flex'} alignItems={'center'} flexDirection={'row'}>
                        <Typography sx={{fontSize:'24px'}}>% </Typography>
                        <Typography sx={{fontSize:'24px'}}>User Choice</Typography>
                        </Stack>
                        </Box>
                    </Box>
                    <Box textAlign={'center'} display={'none'}>
                        <Button variant="contained" startIcon={<DownloadDoneIcon/>} >
                                In WatchList
                        </Button>
                    </Box>
                    <Box textAlign={'center'}>
                        <Button variant="outlined" startIcon={<AddIcon/>} >
                                Add WatchList
                        </Button>
                    </Box>
                    <Box py={2} display={'flex'} flexDirection={'column'} gap={2}>
                        <Typography variant={isSmallScreen ? 'h6' : 'h4'} sx={{fontStyle:'italic'}} >
                                {details?.tagline}
                        </Typography>
                        <Box  sx={{textAlign:'center'}}>
                                <Typography>Overview</Typography>
                                {details?.overview}
                        </Box>
                    </Box>
                    <Box>
                    <Stack mt={6} gap={2} display={'flex'} flexDirection={{xs:'column',sm:'row'}}>
                            {details?.genres?.map((genre) => (
                                <Chip
                                    label={genre?.name}
                                    key={genre?.id}
                                    sx={{border:'2px solid #8d99ae',borderRadius:'5px',bgcolor:'indigo',width:{xs:'100%',sm:'45%'}}}
                                />
                            ))}
                        </Stack>
                    </Box>
                    </Box> 
              </Grid>
               </Grid>
            </Container>
        </Box>
        <Box sx={{my:2}}>
            <Container sx={{pb:10}}>
                <Typography  variant={isSmallScreen ? 'h6' : 'h4'} sx={{textTransform:'uppercase',mt:10}}>
                            Cast
                </Typography>
                
                    <Stack mt={5} mb={10} sx={{display:'flex',flexDirection:'row',overflowX:'scroll'}} gap={5}>
                            {cast?.length===0 &&
                            <Typography>
                                No Cast Found
                            </Typography>
                            }
                            {cast && cast.map((item) => (
                                <Box key={item?.id} sx={{minWidth:'200px'}}>
                                   <Card sx={{height:'100%'}}>
                                   {item?.profile_path === null ? (
                                            <>
                                                {/* Render this if profile_path is null */}
                                                {item?.gender === 1 ? (
                                                    // Render this if gender is 1
                                                    <>
                                                        <CardMedia
                                                            component='img' 
                                                            image={ProfileWoman}
                                                            alt='Image is not loaded'
                                                            sx={{height:'77%'}}
                                                        />
                                                        <CardContent>
                                                            <Typography sx={{ textAlign: 'center' }}>{item?.name} as {item?.character}</Typography>
                                                        </CardContent>
                                                    </> 
                                                    
                                                ) : (
                                                    // Render this if gender is not 1
                                                    <>
                                                        <CardMedia
                                                            component='img'
                                                            image={ProfileMan}
                                                            alt='Image is not loaded'
                                                            sx={{height:'77%'}}
                                                        />
                                                        <CardContent>
                                                            <Typography sx={{ textAlign: 'center' }}>{item?.name} as {item?.character}</Typography>
                                                        </CardContent>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            // Render this if profile_path is not null
                                            <>
                                                {/* Load content when profile_path is not null */}
                                                <CardMedia
                                                    component='img'
                                                    image={`${imagePath}/${item?.profile_path}`}
                                                    alt='Image is not load'
                                                />
                                                <CardContent>
                                                    <Typography sx={{textAlign:'center'}}>{item?.name} <span style={{color:'indigo'}}>as</span> {item?.character}</Typography>
                                                </CardContent>
                                            </>
                                        )}
                                   </Card>
                                </Box>
                            ))}
                    </Stack>
                
                <Box>
                    <Typography  variant={isSmallScreen ? 'h6' : 'h4'} sx={{mb:5}}>Videos</Typography>
                    <Box>
                        <VideoCompo id={video?.key}/>
                        <Stack sx={{mt:5,mb:5,overflowX:'scroll'}} display={'flex'} flexDirection={'row'} gap={5} 
                            alignItems={videos && videos.length > 3 ? 'flex-start' : 'center'}
                            justifyContent={videos && videos.length > 3 ? 'flex-start' : 'center'}
                            >
                            {
                                videos && videos.map((item)=>(
                                    <Card key={item?.id} sx={{minWidth:'350px',textAlign:'center'}}>
                                        <CardMedia>
                                            <VideoCompo id={item?.key} small/>
                                            <Typography mt={2} >{item?.name}</Typography>
                                        </CardMedia>
                                    </Card>
                                ))
                            }
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box>
        </>
    );
}
{/* <Box mx={{xs:0,sm:7,md:12}} >
                    <Typography variant={isSmallScreen ? 'h6' : 'h3'} py={2} fontWeight={'bold'} textAlign={'center'}>
                        {title} {new Date(releaseDate).getFullYear() }
                    </Typography>
                    <Box variant={isSmallScreen ? 'h6' : 'h3'} py={2}>
                        <Stack display='flex' flexDirection='row' alignItems='center' px={3} gap={5}>
                            <CalendarMonthIcon  sx={{ fontSize: isSmallScreen ? '16px' : '32px' }}/>
                            <Typography variant={isSmallScreen ? 'h6' : 'h4'} >
                                {new Date(releaseDate).toLocaleDateString('en-US')}(US)
                            </Typography>
                        </Stack>
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
                        <Stack  alignItems='baseline' gap={4} pl={5} py={3}>
                            <Box sx={{ position: 'relative', display: 'inline-flex' }} >
                            <CircularProgress variant="determinate" color='error' value= {details?.vote_average && details.vote_average.toFixed(1)*10} size={'50px'} sx={{zIndex:12}} />
                            <Box
                                sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                
                                }}
                                border={'4px solid #fff'} borderRadius={'50px'}
                            >
                                <Typography  sx={{ fontSize: isSmallScreen ? '16px' : '22px' }}>
                                {details?.vote_average && details.vote_average.toFixed(1)*10}
                                </Typography>
                            </Box>
                                
                            </Box>
                        </Stack>
                        <Typography sx={{fontSize:'24px'}}>%</Typography>
                        </Box>
                    </Box>
                    <Box textAlign={'center'} display={'none'}>
                        <Button variant="contained" startIcon={<DownloadDoneIcon/>} >
                                In WatchList
                        </Button>
                    </Box>
                    <Box textAlign={'center'}>
                        <Button variant="outlined" startIcon={<AddIcon/>} >
                                Add WatchList
                        </Button>
                    </Box>
                    <Box py={2} display={'flex'} flexDirection={'column'} gap={2}>
                        <Typography variant={isSmallScreen ? 'h6' : 'h4'} sx={{fontStyle:'italic'}} >
                                {details?.tagline}
                        </Typography>
                        <Typography  sx={{textAlign:'center'}}>
                                <Typography>Overview</Typography>
                                {details?.overview}
                        </Typography>
                    </Box>
                    </Box> */}

                