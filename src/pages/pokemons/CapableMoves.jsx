import React, { useContext } from 'react'
import PokeContext from '../../context/pokeContext';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';
function CapableMoves(){
  
  const {pokemon, loading} = useContext(PokeContext);

  console.log("loading", loading);

  return (
    <>
      {
        loading ? <Loader/> : (
          <div className='w-full min-h-[calc(100vh-10vh)]  flex flex-col gap-6 px-10 py-5 relative'>
        <div className="w-full flex flex-col gap-8">
          <h1 className='text-3xl font-nunito font-bold uppercase text-slate-100'>Abilites</h1>
          <div className=" w-full flex flex-wrap items-center justify-start gap-8">
            {
              pokemon?.abilities?.map((ability)=>{
                return(
                  <p className='w-[15vw] h-[6vw] flex items-center justify-center uppercase  bg-green-700 text-xl rounded-lg font-nunito text-slate-100 tracking-wider hover:scale-105 transition-all duration-300 ease-in' key={ability?.ability?.name} >{ability?.ability?.name}</p>
                )
              })
            }
          </div>
        </div>
        <div className="w-full mb-20">
        <h1 className='text-3xl font-nunito font-bold uppercase text-slate-100'>Moves</h1>
            <div className="flex gap-6 flex-wrap  justify-center pt-10">
            {
              pokemon?.moves?.map((move)=>{
                return(
                  <p className='w-[14vw] h-[6vw] flex items-center justify-center uppercase  bg-slate-800 text-md rounded-lg font-nunito text-slate-100 tracking-wider hover:scale-105 transition-all duration-300 ease-in' key={move?.move?.name} >{move?.move?.name}</p>
                )
              })
            }
            </div>
        </div>
        <div className=" w-full z-30 absolute left-0 bottom-0 bg-[#0F1520]">
        <Footer/>
        </div>
        </div>
        )
      }
      
    </>
  )
}

export default CapableMoves