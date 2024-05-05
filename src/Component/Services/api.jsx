import axios from "axios";


export const imagePath='https://image.tmdb.org/t/p/w500';
export const imagePathOriginal='https://image.tmdb.org/t/p/original'
const baseURL='https://api.themoviedb.org/3'
const apiKey=import.meta.env.VITE_MOVIE_API_KEY


// Trending
export const fetchTrending=async(timeWindow='day')=>{
   
    const {data} =await axios.get(`${baseURL}/trending/all/${timeWindow}?api_key=${apiKey}`)

    return data?.results;
}

// Details
export const fetchDetails=async(type,id)=>{
    const res=await axios.get(`${baseURL}/${type}/${id}?api_key=${apiKey}`)
    return res?.data
}
// Credits
export const fetchCredits=async(type,id)=>{
    const res=await axios.get(`${baseURL}/${type}/${id}/credits?api_key=${apiKey}`)
    return res?.data
}

// videos 
export const fetchVideos=async(type,id)=>{
    const res=await axios.get(`${baseURL}/${type}/${id}/videos?api_key=${apiKey}`)
    return res?.data
}