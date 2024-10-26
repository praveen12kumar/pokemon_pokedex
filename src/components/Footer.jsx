import React, { useContext } from 'react'
import { footerNav } from '../utils/constant';
import { Link, useParams } from 'react-router-dom';
import PokeContext from '../context/pokeContext';

function Footer () {
 const {currentTab} = useContext(PokeContext);
  const {name} = useParams();
  
  return (
    <div className='w-screen h-[10vh] flex justify-center items-center border-t border-zinc-400'>
      {
        footerNav?.map((nav) => {
          return (
            <div key={nav.name} className={`text-white border border-slate-200 w-full flex justify-center items-center`}>
              <Link  to={`/pokemon/${name}/${nav.path}`} className={` ${currentTab} == ${nav.name} ? "bg-red-600 text-slate-900" : "" uppercase`}>
                {nav.name}
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default Footer