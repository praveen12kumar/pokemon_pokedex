import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import PokeContext from '../../context/pokeContext';
import Footer from '../../components/Footer';
function Locations(){
    const {name} = useParams();
    
    
    const {getLocationData, locations} = useContext(PokeContext);
    console.log("locations", locations);
    
    useEffect(()=>{
      getLocationData(name)
    },[name])

    


  return (
    <>
    <div className='w-full h-[calc(100vh-20vh)] '>
      <div className='p-16'>
      <h2 className='text-3xl font-nunito font-semibold text-white text-center p-5'>Location Areas for {name}</h2>
      {locations.length > 0 ? (
        <div className='flex flex-wrap gap-8 items-center justify-center'>
          {
            locations.map((location) => (
              <div className='bg-slate-800 p-5 rounded-lg' key={location.name}>
                <h3 className='text-2xl font-nunito font-semibold text-white'>{location.name}</h3>
                <p className='text-lg font-nunito font-semibold text-white uppercase'>{location.location_area.name}</p>
              </div>
            ))
          }
        </div>
      ) : (
        <p className='text-3xl font-nunito font-semibold text-white text-center'>No locations found for this Pokémon.</p>
      )}
    </div>
    </div>
    <Footer pokemon={name}/>
    </>
  )
}

export default Locations