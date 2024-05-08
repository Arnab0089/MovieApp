import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ApplyFilter({sort,setSort,setactivePage}) {

    const handleChange = (event) => {
        console.log(event.target.value)
        const selectedValue = event.target.value;
        setSort(selectedValue);
        localStorage.setItem('selectedFilter', selectedValue);
        setactivePage(1)

      };
  return (
    <Box sx={{ minWidth:250  }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Apply Your Choice</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sort}
        label="Apply Your Choice"
        onChange={handleChange}
        
      >
        <MenuItem value={'popularity.desc'}>Popularity</MenuItem>
        <MenuItem value={'vote_average.desc&vote_count.gte=1000'}>TopRated</MenuItem>
        <MenuItem value={'primary_release_date.desc&vote_count.gte=1000'}>ReleaseDate</MenuItem>
      </Select>
    </FormControl>
  </Box>
  )
}
