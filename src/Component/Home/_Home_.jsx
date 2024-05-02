import React, { useEffect } from 'react'
import { fetchTrending } from '../Services/api'


export default function Home() {
  useEffect(() => {
   fetchTrending('day').then((res)=>{
    console.log(res,'res')
   }).catch((err)=>{
    console.log(err,'err')
   })
  }, [])
  
  return (
    <div className='pt-28 bg-gray-600'>
      <h1>Home</h1>
    </div>
  )
}
