import React from 'react'
import { useContext, useMemo, useState } from 'react';
import PokeContext from '../context/pokeContext';
import PokeCard from '../components/PokeCard';
import SkeletonCard from '../components/SkeletonCard';
import ErrorMessage from '../components/ErrorMessage';
import { pokemonTypes, sortOptions } from '../utils/constant';

function Home(){
  const {
    allPokemonData,
    goToNextPage,
    goToPreviousPage,
    getPokemonsByType,
    activeType,
    next,
    previous,
    loading,
    error,
    getPokemonsPage,
  } = useContext(PokeContext);

  const [sortBy, setSortBy] = useState("id");

  const sortedPokemonData = useMemo(() => {
    const list = [...allPokemonData];
    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "id") {
      list.sort((a, b) => a.id - b.id);
    } else {
      list.sort((a, b) => {
        const statA = a.stats?.find((s) => s.stat.name === sortBy)?.base_stat || 0;
        const statB = b.stats?.find((s) => s.stat.name === sortBy)?.base_stat || 0;
        return statB - statA;
      });
    }
    return list;
  }, [allPokemonData, sortBy]);

  return (
    <>
      <div className="max-w-[95vw] mx-auto flex flex-wrap items-center justify-center gap-4 pt-8">
        <select
          value={activeType}
          onChange={(e) => getPokemonsByType(e.target.value)}
          className="px-4 py-2 rounded-md font-nunito font-semibold text-sm text-slate-600"
        >
          <option value="">All Types</option>
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-md font-nunito font-semibold text-sm text-slate-600"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>Sort by {option.label}</option>
          ))}
        </select>
      </div>

      {
        error ? (
          <ErrorMessage message={error} onRetry={() => getPokemonsByType(activeType)} />
        ) : loading ? (
          <div className="max-w-[95vw] mx-auto min-h-[calc(100vh-10vh)] main grid grid-cols-6 p-10 gap-16 z-20">
            {Array.from({ length: 20 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="max-w-[95vw] mx-auto min-h-[calc(100vh-10vh)] main grid grid-cols-6 p-10  gap-16 z-20">
        {
            sortedPokemonData?.map((pokemon)=>{
                return(
                  <PokeCard key={pokemon.id} data={pokemon} />
                )
            })
        }
        </div>
        )
      }

      {!activeType && !error && (
        <div className="max-w-full h-[10vh] mb-10 flex justify-center items-center gap-6">
          <button
            onClick={goToPreviousPage}
            disabled={!previous || loading}
            className="text-white border border-slate-300 font-nunito px-4 py-2 font-semibold rounded-md cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            disabled={!next || loading}
            className="text-white border border-slate-300 font-nunito px-4 py-2 font-semibold rounded-md cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

export default Home
