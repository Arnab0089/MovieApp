import axios from "axios";



const baseURL='https://api.themoviedb.org/3'
const apiKey=import.meta.env.VITE_MOVIE_API_KEY

export const fetchTrending=async(timeWindow='day')=>{
    console.log(`${baseURL}/trending/all/${timeWindow}?api_key=${apiKey}`)
    const res =await axios.get(`${baseURL}/trending/all/${timeWindow}?api_key=${apiKey}`)

    return res;
}