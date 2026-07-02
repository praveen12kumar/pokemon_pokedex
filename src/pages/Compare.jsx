import React, { useContext, useState } from 'react'
import PokeContext from '../context/pokeContext'
import Image from '../components/Image'

const STAT_MAX = 255;

function PokemonPicker({ label, value, onChange, suggestions, onPick }) {
  return (
    <div className="w-full max-w-sm relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={`Search ${label}`}
        className="w-full h-10 border-none outline-none rounded-md px-4 py-2 font-nunito font-semibold text-sm text-slate-600"
      />
      {value && suggestions?.length > 0 && (
        <div className="w-full max-h-52 absolute bg-white top-11 overflow-auto rounded-lg z-10 p-3">
          {suggestions.map((item) => (
            <div
              key={item.name}
              onClick={() => onPick(item.name)}
              className="w-full even:bg-slate-200 px-2 font-nunito py-1 cursor-pointer"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StatBars({ pokemon, loading, error }) {
  if (loading) return <p className="text-white font-nunito text-center">Loading...</p>;
  if (error) return <p className="text-red-400 font-nunito text-center">{error}</p>;
  if (!pokemon?.name) return <p className="text-white font-nunito text-center">Pick a Pokémon</p>;
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Image
        src={pokemon?.sprites?.other?.home?.front_default}
        alt={pokemon?.name}
        styles="w-40 h-40"
      />
      <h2 className="text-2xl uppercase text-white font-nunito font-bold">{pokemon.name}</h2>
      <div className="w-full flex flex-col gap-2">
        {pokemon?.stats?.map((stat) => (
          <div key={stat.stat.name} className="flex flex-col gap-1">
            <div className="flex justify-between text-white font-nunito text-xs uppercase">
              <span>{stat.stat.name}</span>
              <span>{stat.base_stat}</span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded">
              <div
                className="h-full bg-green-500 rounded"
                style={{ width: `${Math.min((stat.base_stat / STAT_MAX) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Compare() {
  const { pokemonDatabase, getComparePokemon, compareA, compareB } = useContext(PokeContext);

  const [searchA, setSearchA] = useState("");
  const [searchB, setSearchB] = useState("");
  const [suggestionsA, setSuggestionsA] = useState([]);
  const [suggestionsB, setSuggestionsB] = useState([]);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);
  const [errorA, setErrorA] = useState(null);
  const [errorB, setErrorB] = useState(null);

  const handleChangeA = (e) => {
    setSearchA(e.target.value);
    setSuggestionsA(
      pokemonDatabase.filter((p) => p.name.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  }

  const handleChangeB = (e) => {
    setSearchB(e.target.value);
    setSuggestionsB(
      pokemonDatabase.filter((p) => p.name.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  }

  const handlePickA = async (name) => {
    setSearchA("");
    setSuggestionsA([]);
    setErrorA(null);
    setLoadingA(true);
    try {
      await getComparePokemon("A", name);
    } catch (error) {
      setErrorA(`Couldn't load "${name}".`);
    } finally {
      setLoadingA(false);
    }
  }

  const handlePickB = async (name) => {
    setSearchB("");
    setSuggestionsB([]);
    setErrorB(null);
    setLoadingB(true);
    try {
      await getComparePokemon("B", name);
    } catch (error) {
      setErrorB(`Couldn't load "${name}".`);
    } finally {
      setLoadingB(false);
    }
  }

  return (
    <div className="w-[95vw] mx-auto min-h-[calc(100vh-10vh)] p-10 flex flex-col items-center gap-10">
      <h1 className="text-3xl font-nunito font-bold text-white text-center uppercase">Compare Pokémon</h1>

      <div className="w-full flex justify-center gap-16">
        <PokemonPicker label="first Pokémon" value={searchA} onChange={handleChangeA} suggestions={suggestionsA} onPick={handlePickA} />
        <PokemonPicker label="second Pokémon" value={searchB} onChange={handleChangeB} suggestions={suggestionsB} onPick={handlePickB} />
      </div>

      <div className="w-full grid grid-cols-2 gap-16">
        <StatBars pokemon={compareA} loading={loadingA} error={errorA} />
        <StatBars pokemon={compareB} loading={loadingB} error={errorB} />
      </div>
    </div>
  )
}

export default Compare
