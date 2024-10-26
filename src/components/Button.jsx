import React from 'react'

function Button ({styles, text, handleSpin}){
  return (

        <button 
            onMouseEnter={handleSpin}
            onMouseLeave={handleSpin}
        className={`${styles} flex items-center justify-center`}>
            {text}
        </button>
    
  )
}

export default Button