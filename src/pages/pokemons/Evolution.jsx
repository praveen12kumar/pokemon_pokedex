import React, { useEffect } from 'react';
import { useContext } from 'react';
import PokeContext from '../../context/pokeContext';
import Loader from '../../components/Loader';
import Footer from '../../components/Footer'
function Evolution(){
  const {pokemon, getEvaluationData, evolutions, loading, setCurrentTab} = useContext(PokeContext);

  useEffect(()=>{
    getEvaluationData(pokemon?.name);
    setCurrentTab("evolution");
  },[pokemon?.name])


  return (
    <>
      {
        loading ? <Loader/> : (
          <>
        <div className='max-w-7xl mx-auto h-[calc(100vh-10vh)] p-10'>
        <h1 className='text-3xl font-nunito font-bold text-white text-center'>Evolution of {pokemon?.name}</h1>
        {
          evolutions?.length > 0 ? (
            <div className='w-full flex flex-wrap items-center justify-center gap-8 mt-10'>
            {
              evolutions?.splice(0, 2).map((evo) => {
                return(
                  <h1 className='w-[15vw] h-[6vw] flex items-center justify-center uppercase  bg-green-700 text-xl rounded-lg font-nunito text-slate-100 tracking-wider hover:scale-105 transition-all duration-300 ease-in'>{evo?.evolves_to[0]}</h1>

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
      <div className=" w-full z-30 absolute left-0 bottom-0 bg-[#0F1520]">
        <Footer/>
        </div>
      
          </>
        )
        
        }
    </>
  )
}

export default Evolution