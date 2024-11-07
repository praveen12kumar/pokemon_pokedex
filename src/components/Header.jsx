import React from 'react'
import pokeballIcon from '../assets/pokeballIcon.png';
import { CiMenuBurger } from "react-icons/ci";
import {navigationRoutes} from "../utils/constant"
import { Link } from 'react-router-dom';

function Header () {
  return (
    <div className='w-[95vw] mx-auto h-[10vh] flex justify-between items-center '>
        <div className="pl-10  flex items-center justify-center">
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
        <div className="text-2xl pr-10 h-16 flex justify-center items-center  text-white font-bold ">
            <CiMenuBurger className='ml-4 '/>
        </div>
    </div>
  )
}

export default Header