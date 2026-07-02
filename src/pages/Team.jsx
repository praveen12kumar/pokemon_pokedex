import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PokeContext from '../context/pokeContext'
import Image from '../components/Image'

function Team() {
  const { favorites, toggleFavorite } = useContext(PokeContext);

  return (
    <div className="w-[95vw] mx-auto min-h-[calc(100vh-10vh)] p-10">
      <h1 className="text-3xl font-nunito font-bold text-white text-center mb-10 uppercase">
        My Team ({favorites.length}/6)
      </h1>
      {favorites.length === 0 ? (
        <p className="text-center text-white font-nunito text-lg">
          No Pokémon added yet. Tap the heart on any Pokémon card to add it to your team.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {favorites.map((p) => (
            <div
              key={p.name}
              className="backdrop-blur-lg bg-white/20 hover:bg-white/30 transition-all duration-300 ease-in rounded-lg p-4 flex flex-col items-center gap-2"
            >
              <Link to={`/pokemon/${p.name}/description`} className="w-32">
                <Image src={p.sprite} alt={p.name} styles="w-32" />
              </Link>
              <h2 className="uppercase text-white font-nunito font-bold">{p.name}</h2>
              <div className="flex gap-2">
                {p.types?.map((t) => (
                  <span key={t} className="text-xs uppercase text-slate-200 font-nunito">{t}</span>
                ))}
              </div>
              <button
                onClick={() => toggleFavorite(p)}
                className="text-xs text-red-400 uppercase font-nunito cursor-pointer mt-2 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Team
