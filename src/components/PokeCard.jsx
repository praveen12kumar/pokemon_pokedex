import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import PokeContext from '../context/pokeContext'


function PokeCard ({data}){

    const { favorites, toggleFavorite } = useContext(PokeContext);
    const isFavorite = favorites?.some((p) => p.name === data?.name);

    const handleToggleFavorite = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite({
        name: data?.name,
        id: data?.id,
        sprite: data?.sprites?.other?.home?.front_default,
        types: data?.types?.map((t) => t?.type?.name),
      });
    }

  return (
    <div className='relative backdrop-blur-lg bg-white/20 hover:bg-white/30 hover:scale-105 transition-all duration-300 ease-in rounded-lg p-2'>
        <button
          onClick={handleToggleFavorite}
          title={isFavorite ? "Remove from team" : "Add to team"}
          className='absolute top-2 right-2 text-lg text-red-500 cursor-pointer z-10'
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
        <h1 className='text-md font-bold text-slate-100 font-nunito uppercase text-center p-1'>{data.name}</h1>
        <div className="w-[160px] -mt-3">
          <Link to={`/pokemon/${data?.name}/description`}>
          <img className='cursor-pointer' src={data?.sprites?.other?.home?.front_default} alt="pokemon-Image" />
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