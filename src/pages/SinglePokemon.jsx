import React,{ useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PokeContext from '../context/pokeContext';
import Description from './pokemons/Description';
import Evolution from './pokemons/Evolution';
import Locations from './pokemons/Locations';
import CapableMoves from "./pokemons/CapableMoves";



function SinglePokemon () {

    const {name} = useParams();
    const {loading, pokemon, getPokemon, dispatch, currentTab} = useContext(PokeContext)
    console.log("pokemon", pokemon);
    console.log("currentTab", currentTab);


    useEffect(()=>{
        getPokemon(name)
        dispatch({type:"PAGE_DESCRIPTION", payload:"description"})
      },[name])

  return (
    <div>
        
        {
          pokemon &&  loading === false ? (
                <>
                    {currentTab === "description" && <Description/>}
                    {currentTab === "evolution" && <Evolution/>}
                    {currentTab === "location" && <Locations/>}
                    {currentTab === "moves" && <CapableMoves/>}
                    
                </>
            ) : "Loading..."
        }
    </div>
  )
}

export default SinglePokemon