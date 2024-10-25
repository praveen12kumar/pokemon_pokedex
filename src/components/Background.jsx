import React from 'react'
import pokeball1 from '../assets/pokeball.png'
import pokeball2 from '../assets/pokeball2.png'

const Background = () => {
  return (
    <div className='w-screen h-screen grid grid-cols-3 -z-10'>
        <img className='h-[15rem] ' src={pokeball1} alt="pokeball1" />
        <img className='h-[15rem]' src={pokeball2} alt="pokeball2" />
        <img className='h-[15rem]' src={pokeball1} alt="pokeball1" />
        <img className='h-[15rem] ' src={pokeball2} alt="pokeball2" />
        <img className='h-[15rem]' src={pokeball1} alt="pokeball1" />
        <img className='h-[15rem] ' src={pokeball2} alt="pokeball2" />
    </div>
  )
}

export default Background