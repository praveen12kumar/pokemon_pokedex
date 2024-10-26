import React, { useEffect } from 'react';
import { useContext } from 'react';
import PokeContext from '../../context/pokeContext';

import Footer from '../../components/Footer'
function Evolution(){
  const {pokemon, getEvaluationData, evolutions} = useContext(PokeContext);
  
  console.log("evolutions", evolutions);

  useEffect(()=>{
    getEvaluationData(pokemon?.name);
  },[pokemon?.name])


  return (
    <>
      <div className='w-full h-[calc(100vh-20vh)] p-10'>
        <h1 className='text-3xl font-nunito font-bold text-white text-center'>Evolution of {pokemon?.name}</h1>
        {
          evolutions?.length > 0 ? (
            <div className='w-full flex flex-wrap items-center justify-center gap-8 mt-10'>
            {
              evolutions?.splice(0, 2).map((evo) => {
                return(
                  <h1 className='w-[15vw] h-[6vw] flex items-center justify-center uppercase  bg-green-700 text-xl rounded-lg font-nunito text-slate-100 tracking-wider'>{evo?.evolves_to[0]}</h1>

                )
              })
            }
            </div>
          ) : (
            <div className="">
              <p className='text-3xl font-nunito font-semibold text-white text-center'>No evolution found for this Pokemon.</p>
            </div>
          )
        }
      </div>
      <Footer/>
    </>
  )
}

export default Evolution