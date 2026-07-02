import React, { useContext, useEffect, useState } from "react";
import PokeContext from "../../context/pokeContext";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import Image from "../../components/Image";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { IoVolumeHighOutline } from "react-icons/io5";
import { GiSparkles } from "react-icons/gi";
function Description() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [isShiny, setIsShiny] = useState(false);

  const { getPokemon, pokemon, fetchTypeData, typeRelations, loading, error, setCurrentTab, species, getSpecies } =
    useContext(PokeContext);

  const loadData = async () => {
    fetchTypeData(name);
    const data = await getPokemon(name);
    if (data?.species?.name) {
      getSpecies(data.species.name);
    }
  }

  useEffect(() => {
    loadData();
    setCurrentTab("description");
    setIsShiny(false);
  }, [name]);

  const handlePlayCry = () => {
    const cryUrl = pokemon?.cries?.latest;
    if (cryUrl) {
      new Audio(cryUrl).play();
    }
  };

  // dream_world artwork only exists for base species, not alternate forms
  // (mega/gmax/regional), so it can't be the primary source once the form
  // switcher is in play. official-artwork and home cover every form.
  const displayImage = isShiny
    ? pokemon?.sprites?.other?.["official-artwork"]?.front_shiny
      || pokemon?.sprites?.other?.home?.front_shiny
      || pokemon?.sprites?.front_shiny
    : pokemon?.sprites?.other?.["official-artwork"]?.front_default
      || pokemon?.sprites?.other?.home?.front_default
      || pokemon?.sprites?.other?.dream_world?.front_default
      || pokemon?.sprites?.front_default;

  const flavorText = species?.flavor_text_entries
    ?.find((entry) => entry.language.name === "en")
    ?.flavor_text?.replace(/[\f\n\r]/g, " ");

  const genus = species?.genera?.find((g) => g.language.name === "en")?.genus;

  //console.log("pokemon", pokemon);


  return (
    <>
      {
        error ? <ErrorMessage message={error} onRetry={loadData}/> :
        loading ? <Loader/>: (
          <>
      <div className="relative w-[95vw] mx-auto min-h-[calc(100vh-10vh)] px-10 pb-24">
        <div className="flex justify-between">
        <div className="w-1/3 relative flex flex-col justify-around ">
          <div className="w-2/3 flex flex-col bg-slate-800 p-5 relative">
            <h1 className=" text-3xl uppercase text-white font-nunito flex items-center gap-3">
              {pokemon.name}
              {pokemon?.cries?.latest && (
                <IoVolumeHighOutline
                  onClick={handlePlayCry}
                  title="Play cry"
                  className="text-xl text-green-500 cursor-pointer hover:scale-110 transition-all duration-200 ease-in"
                />
              )}
            </h1>
            <h3 className="text-md uppercase text-white font-nunito">
              <span>Type: </span>
              {pokemon?.types?.map((t) => {
                return (
                  <p key={t?.type?.name} className="inline text-white font-nunito text-md ml-2">
                    {t?.type?.name}
                  </p>
                );
              })}
            </h3>
            <div className="absolute -bottom-5 -right-3" onClick={()=>navigate(`/pokemon/${pokemon?.name}/evolution`)}>
              <Button
                text={"See next Evolution"}
                styles={
                  "text-[12px] text-white uppercase font-nunito border border-slate-200  px-4 py-1 font-semibold text-slate-600"
                }
              />
            </div>
          </div>

          <div className="w-2/3 flex flex-col  gap-1">
            {pokemon?.stats?.map((stat) => {
              return (
                <div className="flex items-center justify-end gap-2 text-white" key={stat?.stat?.name}>
                  <h1 className="uppercase  overflow-hidden text-nowrap text-sm tracking-wider">
                    {stat?.stat?.name}
                    {": "}
                  </h1>
                  <h3>{stat?.base_stat}</h3>
                  <div className="w-[150px] h-1 ">
                    <div
                      style={{ width: `${stat?.base_stat}%` }}
                      className="h-full bg-green-500 rounded-lg"
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-1/3 flex flex-col justify-center items-center gap-4">
          <div className="w-full max-w-[400px] aspect-square rounded-full border-4 border-green-600 p-5">
            <div className="w-full h-full rounded-full border-2 border-green-600">
              <Image
                src={displayImage}
                alt={pokemon?.name}
                styles="w-full h-full p-6"
              />
            </div>
          </div>
          <button
            onClick={() => setIsShiny((prev) => !prev)}
            className="flex items-center gap-2 text-sm text-white uppercase font-nunito border border-slate-200 px-4 py-1 font-semibold rounded-md cursor-pointer hover:scale-105 transition-all duration-200 ease-in"
          >
            <GiSparkles className={isShiny ? "text-yellow-400" : ""} />
            {isShiny ? "View Normal" : "View Shiny"}
          </button>

          {species?.varieties?.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center max-w-[300px]">
              {species.varieties.map((variety) => (
                <button
                  key={variety.pokemon.name}
                  onClick={() => navigate(`/pokemon/${variety.pokemon.name}/description`)}
                  className={`text-[11px] uppercase px-3 py-1 rounded-md font-nunito border cursor-pointer ${
                    variety.pokemon.name === pokemon.name
                      ? "bg-green-600 border-green-600 text-white"
                      : "border-slate-300 text-white hover:bg-slate-700"
                  }`}
                >
                  {variety.pokemon.name.replace(`${species.name}-`, "") || variety.pokemon.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="w-1/3 relative flex flex-col justify-around">
          <div className="bg-slate-800 p-5">
            <div className="">
              <h1 className="text-md uppercase inline text-white font-nunito">
                Types:
              </h1>
              {pokemon?.types
                ?.map((type, index) => {
                  return (
                    <p key={index} className="inline bg-slate-700 px-2 py-1 rounded-md text-white font-nunito text-md ml-2">
                      {type?.type?.name}
                    </p>
                  );
                })
                .splice(0, 5)}
            </div>
            <div className="">
              <h1 className="text-md uppercase inline text-white font-nunito">
                Moves:
              </h1>
              {pokemon?.moves
                ?.map((move) => {
                  return (
                    <p className="inline  text-white font-nunito text-md ml-2">
                      {move?.move?.name}
                    </p>
                  );
                })
                .splice(0, 10)}
            </div>
            <div className="">
              <h1 className="text-md uppercase inline text-white font-nunito">
                Abilities:
              </h1>
              {pokemon?.abilities
                ?.map((ability) => {
                  return (
                    <p className="inline  text-white font-nunito text-md ml-2">
                      {ability?.ability?.name}
                    </p>
                  );
                })
                .splice(0, 5)}
            </div>
          </div>

          <div className="bg-slate-800 p-5 text-white font-nunito">
           
            <p>
              <strong>Weak Against:</strong>{" "}
              {typeRelations?.double_damage_from?.join(", ")}
            </p>
            <p>
              <strong>Resistant To:</strong>{" "}
              {typeRelations?.half_damage_from?.join(", ")}
            </p>
            <p><strong>Immune To:</strong>{" "} 
              {typeRelations?.half_damage_to?.join(", ")}</p>
            <p>
              <strong>Strong Against:</strong>{" "}
              {typeRelations?.double_damage_to?.join(", ")}
            </p>
          </div>
        </div>
        </div>

        {(flavorText || genus || species?.habitat || species?.egg_groups?.length > 0) && (
          <div className="w-full mt-10 bg-slate-800 p-5 text-white font-nunito">
            <h1 className="text-md uppercase font-bold mb-2">About</h1>
            {flavorText && <p className="text-sm leading-relaxed">{flavorText}</p>}
            <div className="flex flex-wrap gap-x-8 gap-y-1 mt-3 text-sm">
              {genus && (
                <p>
                  <strong>Genus:</strong> {genus}
                </p>
              )}
              {species?.habitat?.name && (
                <p>
                  <strong>Habitat:</strong> {species.habitat.name}
                </p>
              )}
              {species?.capture_rate !== undefined && (
                <p>
                  <strong>Capture Rate:</strong> {species.capture_rate}
                </p>
              )}
              {species?.egg_groups?.length > 0 && (
                <p>
                  <strong>Egg Groups:</strong>{" "}
                  {species.egg_groups.map((g) => g.name).join(", ")}
                </p>
              )}
            </div>
          </div>
        )}

        <div className=" w-full z-30 absolute left-0 bottom-0 bg-[#0F1520]">
        <Footer/>
        </div>
      </div>

          </>
        )
      }
    </>
  );
}

export default Description;
