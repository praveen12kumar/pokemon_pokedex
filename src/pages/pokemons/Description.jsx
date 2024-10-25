import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PokeContext from '../../context/pokeContext';

function Description(){
  
  const {name} = useParams();
  const {loading, pokemon, getPokemon} = useContext(PokeContext)
  console.log("pokemon", pokemon);

  useEffect(()=>{
    getPokemon(name)
  },[name])

  
  return (
    <div>Description</div>
  )
}

export default Description