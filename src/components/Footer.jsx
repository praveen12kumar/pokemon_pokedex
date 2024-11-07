import React, { useContext } from 'react';
import { footerNav } from '../utils/constant';
import { Link, useParams } from 'react-router-dom';
import PokeContext from '../context/pokeContext';

function Footer () {
  const { currentTab } = useContext(PokeContext);
  const { name } = useParams();
 
  return (
    <div className='w-[98vw] px-10 mx-auto h-[10vh] flex justify-between items-center border-t border-zinc-400'>
      {
        footerNav?.map((nav) => {
          return (
            <div key={nav.name} className='text-white font-nunito  flex justify-center items-center'>
              <Link 
                to={`/pokemon/${name}/${nav.path}`} 
                className={`${currentTab === nav.name ? "bg-green-600 text-slate-100 p-5 rounded-md font-nunito" : ""} uppercase`}
              >
                {nav.name}
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default Footer;
