import React from 'react'

function SkeletonCard() {
  return (
    <div className='rounded-lg p-2 bg-white/10 animate-pulse flex flex-col items-center gap-3'>
      <div className='w-2/3 h-4 bg-white/20 rounded' />
      <div className='w-[140px] h-[140px] bg-white/20 rounded-full' />
      <div className='w-1/2 h-3 bg-white/20 rounded' />
    </div>
  )
}

export default SkeletonCard
