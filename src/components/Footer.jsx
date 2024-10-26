import React, { useContext } from 'react'
import { footerNav } from '../utils/constant';
import { Link } from 'react-router-dom';
import PokeContext from '../context/pokeContext';

function Footer () {
 const {currentTab} = useContext(PokeContext);
 console.log("currentTab footer", currentTab);
  return (
    <div className='w-screen h-[10vh] flex justify-center items-center border-t border-zinc-400'>
      {
        footerNav?.map((nav) => {
          return (
            <div key={nav.name} className={`text-white border border-slate-200 w-full flex justify-center items-center`}>
              <Link  to={nav.path} className={` ${currentTab} == ${nav.name} ? "bg-red-600 text-slate-900" : ""`}>
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