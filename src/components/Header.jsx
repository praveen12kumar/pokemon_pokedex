import React from 'react'
import pokeballIcon from '../assets/pokeballIcon.png';
import { CiMenuBurger } from "react-icons/ci";
import {navigationRoutes} from "../utils/constant"
import { Link } from 'react-router-dom';

function Header () {
  return (
    <div className='w-full h-[10vh] border-b border-zinc-400 flex justify-between items-center overflow-hidden'>
        <div className="pl-10 border-r border-zinc-400 flex items-center justify-center">
            <img className='w-12 mr-3' src={pokeballIcon} alt="logo" />
        </div>

        <div className="">
            <ul className='flex items-center justify-center gap-28'>
                {
                    navigationRoutes.map((route) => {
                        return(
                            <Link to={route.path} key={route.name}>
                                <li className='text-sm text-white uppercase tracking-wider'>{route.name}</li>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
        <div className="text-2xl pr-10 h-16 flex justify-center items-center  text-white font-bold border-l border-zinc-400">
            <CiMenuBurger className='bg-slate-800 ml-4 '/>
        </div>
    </div>
  )
}

export default Header