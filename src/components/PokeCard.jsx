import React from 'react'
import { Link } from 'react-router-dom'


function PokeCard ({data}){
    
    const handleNavigate = ()=>{

    }
  return (
    <div className='bakdrop-blur-lg bg-white/20 hover:bg-white/30 hover:scale-105 transition-all duration-300 ease-in rounded-lg p-2'>
        <h1 className='text-md font-bold text-slate-100 font-nunito uppercase text-center p-1'>{data.name}</h1>
        <div className="w-[160px] -mt-3" onClick={handleNavigate}>
          <Link to={`/pokemon/${data?.name}`}>
          <img className='mix-blend-darken cursor-pointer' src={data?.sprites?.other?.home?.front_default} alt="pokemon-Image" />
          </Link>
        </div>
        <div className="flex gap-6 justify-center p-2">
          {
            data.types?.map((type)=>(
              <h1 key={type?.type?.name} className='text-[12px] text-slate-100 font-nunito uppercase text-center p-1'>{type?.type?.name}</h1>
            ))
          }
        </div>
    </div>
  )
}

export default PokeCard