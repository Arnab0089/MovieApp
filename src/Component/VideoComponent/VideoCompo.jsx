import React from 'react'
import propTypes from 'prop-types'

export default function VideoCompo({id,small}) {
  return (
    <iframe 
    src={`https://www.youtube.com/embed/${id}`} 
     width='100%' 
    height={small?'250px':'500px'}
    title='Youtube Video Player'
    allowFullScreen
    >

    </iframe>
  )
}

VideoCompo.propTypes={
    id:propTypes.string,
    small:propTypes.bool
}