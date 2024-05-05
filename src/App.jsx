import React, { useState } from 'react'
import Navbar from './Component/Navbar/Nav_bar'
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './Component/Home/_Home_';
import Movies from './Component/Movies/Movies';
import TvShows from './Component/TvShows/TvShows';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Lowernav from './Component/Navbar/Lowernav';
import Show from './Component/Show/Show';


export default function App() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };
  

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          background: {
            default: darkMode ? '#2b2d42' : '#edf2f4',
          },
          text: {
            primary: darkMode ? '#8d99ae' : '#d90429',
          },
          button:{
            default: darkMode ? '#EF233C' : '#8D99AE',
          }
        },
      }),
    [darkMode],
  );
  return (
    <Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
      
      <Routes> {/* Wrap Routes around your Route components */}
        <Route path="/" element={<Home darkMode={darkMode} />} /> {/* Use "element" prop instead of "component" */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TvShows />} />
        <Route path="/:type/:id" element={<Show />} />
      </Routes>
      <Lowernav/>
    </ThemeProvider>
  </Router>
  )
}
