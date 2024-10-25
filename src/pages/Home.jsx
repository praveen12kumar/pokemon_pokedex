import React from 'react'
import { useContext } from 'react';
import PokeContext from '../context/pokeContext';

function Home (){
  const {allPokemonData} = useContext(PokeContext);
    return (
    <div>Home</div>
  )
}

export default Home