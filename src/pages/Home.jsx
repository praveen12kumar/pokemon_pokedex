import React from 'react'
import { useContext } from 'react';
import PokeContext from '../context/pokeContext';
import PokeCard from '../components/PokeCard';

function Home(){
  const {allPokemonData} = useContext(PokeContext);
  
  console.log(allPokemonData);
  
    return (
    <>
        <div className=" main grid grid-cols-6 p-20  gap-16 z-20">
            {
                allPokemonData?.map((pokemon)=>{
                    return(
                      <PokeCard key={pokemon.id} data={pokemon} />
                    )
                })
            }
        </div>
        <div className="w-[100%] h-[10vh] mb-10 flex justify-center items-center">
        <button className='text-white border border-slate-300 font-nunito px-4 py-2 font-semibold rounded-md cursor-pointer '>Load More</button>
        </div>
    
    </>
  )
}

export default Home