import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'

export default function Pagination({activePage,totalPage,setactivePage}) {
  return (
    <Box  py={5} my={2} >
        <Stack display={'flex'} flexDirection={{xs:'column',sm:'row'}} gap={2} alignItems={'center'} justifyContent={'center'}>
            <Stack display={'flex'} flexDirection={{xs:'column',sm:'row'}} alignItems={'center'} my={{xs:'5',sm:'10'}} gap={2} >
                <Button variant='contained' onClick={()=>setactivePage(activePage-1)} disabled={activePage === 1}>Prev</Button>
                <Button variant='contained' onClick={()=>setactivePage(activePage+1)} disabled={activePage===totalPage}>Next</Button>
                <Button
                variant='contained'
                onClick={() => setactivePage(activePage = 1)}
                sx={{
                    position: { xs: 'relative', sm: 'absolute' },
                    right: { xs: '0px', sm: '50px' }, // Adjust the value accordingly
                }}
                disabled={activePage === 1}
                >
                Home Page
            </Button>
            </Stack>
            <Stack gap={2} display={'flex'} flexDirection={'row'}>
                <Typography>{activePage}</Typography>
                <Typography>of</Typography>
                <Typography>{totalPage}</Typography>
            </Stack>
        </Stack>
        
    </Box>
  )
}
