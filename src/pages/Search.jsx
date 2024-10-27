import axios from "axios";
import { useContext, useEffect } from "react";
import PokeContext from "../context/pokeContext";
import { useState } from "react";
import Input from "../components/Input";
import PokeCard from "../components/PokeCard";
import Loader from "../components/Loader";
function Search() {
  const [searchItems, setSearchItems] = useState([]);

  const {
    search,
    setSearch,
    searchResults,
    getSearchedPokemon,
    getRandomPokemon,
    pokemonDatabase,
    loading,
    dispatch,
  } = useContext(PokeContext);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const pokemons = pokemonDatabase.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchItems(pokemons);
  };

  const handleSearchPokemon = (name) => {
    getSearchedPokemon(name);
    setSearch("");
  };

  // useEffect(() => {
  //   if(searchResults) {
      
  //   }
  // }, [searchResults]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-screen min-h-[calc(100vh-10vh)] flex flex-col relative">
            <div className="w-full flex justify-center">
              <Input
                handleSearch={handleSearch}
                type={"text"}
                value={search}
                placeholder={"Search Pokemon"}
                styles={
                  "w-96 h-10 border none outline-none rounded-md px-4 py-2 font-nunito font-semibold text-sm text-slate-600"
                }
              />
            </div>

            {search && (
              <div className="w-[470px] max-h-52 absolute bg-white top-20 left-1/2 overflow-auto rounded-lg transform -translate-x-1/2 z-10 p-5">
                {searchItems?.map((item) => {
                  return (
                    <div
                      onClick={() => handleSearchPokemon(item.name)}
                      key={item.name}
                      className="w-full even:bg-slate-200 px-2 font-nunito py-1 flex justify-start gap-1 cursor-pointer"
                    >
                      {item?.name}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="w-full  flex flex-wrap justify-center gap-16">
              {searchResults && Object.keys(searchResults).length > 0 && 
                <PokeCard data={searchResults} />
               }
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Search;
