import React from 'react'

function Logo({width = '100px'}) {
  return (
    <img src="public\logo.jpg" className='h-16 w-auto object-contain' alt="" />
  )
}

export default Logo