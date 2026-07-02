import React from 'react'
import pokeballIcon from '../assets/pokeballIcon.png';

function Image  ({src, alt, styles}) {
  const handleError = (e) => {
    if (e.target.src !== pokeballIcon) {
      e.target.src = pokeballIcon;
      e.target.classList.add("opacity-40");
    }
  }

  return (
    <>
        <img src={src || pokeballIcon} alt={alt} className={styles} onError={handleError} />
    </>
  )
}

export default Image