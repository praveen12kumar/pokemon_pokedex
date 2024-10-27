import React from 'react'
import pokeballIcon from '../assets/pokeballIcon.png';
function Loader () {
  return (
    <div className='w-full h-[calc(100vh-10vh)] flex justify-center items-center' >
        <img className='w-44 animate-spin' src={pokeballIcon} alt="Loading..." />
    </div>
  )
}

export default Loader