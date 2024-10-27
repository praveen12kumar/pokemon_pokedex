import React from 'react'
import { useContext } from 'react';
import PokeContext from '../context/pokeContext';
import PokeCard from '../components/PokeCard';
import Button from '../components/Button';
import Loader from '../components/Loader';

function Home(){
  const {allPokemonData, nextPage, loading} = useContext(PokeContext);
  //console.log(allPokemonData);
  
  const handleLoadMore = ()=>{
    nextPage();
  }


    return (
    <>
        <>
          {
            loading ? <Loader/> : (
              <div className="w-full min-h-[calc(100vh-10vh)] main grid grid-cols-6 p-20  gap-16 z-20">
            {
                allPokemonData?.map((pokemon)=>{
                    return(
                      <PokeCard key={pokemon.id} data={pokemon} />
                    )
                })
            }
        </div>
            )
          }
        </>
        <div className="w-[100%] h-[10vh] mb-10 flex justify-center items-center">
            <Button
              text={"Load More"}
              styles="text-white border border-slate-300 font-nunito px-4 py-2 font-semibold rounded-md cursor-pointer "
              handleLoadMore={handleLoadMore}
            />
        </div>
    
    </>
  )
}

export default Home