import React, { useContext, useEffect, useReducer } from 'react'
import PokeContext from '../../context/pokeContext'
import { useParams } from 'react-router-dom'
function Description(){
  
  const {name} = useParams()
  
  
  const {dispatch,getPokemon, pokemon } = useContext(PokeContext)
  
  useEffect(()=>{
   
  },[])

  

  
  return (
   <>
    <div className="w-full h-[calc(100vh-10vh)] bg-black opacity-20 flex flex-col justify-between">
      <div className="w-1/3">

      </div>
      <div className="w-1/3">
        
      </div>
      <div className="w-1/3">
        
      </div>
    </div>
   </>
  )
}

export default Description