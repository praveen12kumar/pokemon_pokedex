import React from 'react'

function Image  ({src, alt, styles}) {
  return (
    <>
        <img src={src} alt={alt} className={styles} />
    </>
  )
}

export default Image