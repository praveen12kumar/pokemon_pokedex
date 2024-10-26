import React, { useState } from 'react'
import Button from './Button'
import { MdCatchingPokemon } from "react-icons/md";
function Input ({handleSearch, type, placeholder, styles, }) {
    const [spin, setSpin] = useState(false);
    const handleSpin = () => {
        setSpin(!spin);
    }
  return (
    <div className=" flex justify-center gap-1 py-5">
      <input 
        onChange={handleSearch}
        type={type} 
        placeholder={placeholder} 
        className={`${styles}`} />
      <Button 
        handleSpin={handleSpin}
        styles='w-20 h-10 border border-slate-200  rounded-md px-4 py-2 font-nunito font-semibold text-sm text-slate-600' 
        text={<MdCatchingPokemon className={`text-white text-3xl bg-red-600 rounded-full ${spin ? "animate-spin" : ""}`}
        />}/>
    </div>
  )
}

export default Input