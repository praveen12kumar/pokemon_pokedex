import React from 'react'

function Button ({styles, text, handleSpin, handleLoadMore}){
  return (

        <button 
            onMouseEnter={handleSpin}
            onMouseLeave={handleSpin}
            onClick={handleLoadMore}
        className={`${styles} flex items-center justify-center`}>
            {text}
        </button>
    
  )
}

export default Button