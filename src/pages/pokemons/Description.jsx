import React, { useContext, useEffect, useReducer } from "react";
import PokeContext from "../../context/pokeContext";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import Image from "../../components/Image";

function Description() {
  const { name } = useParams();

  const { getPokemon, pokemon, fetchTypeData, typeRelations } =
    useContext(PokeContext);

  useEffect(() => {
    getPokemon(name);
    fetchTypeData(name);
  }, [name]);

  console.log("typeRelations", typeRelations);
  console.log(typeof typeRelations);

  return (
    <>
      <div className="w-full h-[calc(100vh-10vh)] flex justify-between px-16">
        <div className="w-1/3 relative flex flex-col justify-evenly">
          <div className="w-2/3 flex flex-col bg-slate-800 p-5 relative">
            <h1 className=" text-3xl uppercase text-white font-nunito ">
              {pokemon.name}
            </h1>
            <h3 className="text-md uppercase text-white font-nunito">
              <span>Type: </span>
              {pokemon?.types?.map((t) => {
                return (
                  <p className="inline text-white font-nunito text-md ml-2">
                    {t?.type?.name}
                  </p>
                );
              })}
            </h3>
            <div className="absolute -bottom-5 -right-3">
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
                <div className="flex items-center justify-end gap-2 text-white">
                  <h1 className="uppercase text-sm tracking-wider">
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
        <div className="w-1/3 flex justify-center items-center">
          <div className="w-[400px] h-[400px] rounded-full border-4 border-green-600 p-5">
            <div className="w-[350px] h-[350px] rounded-full border-2 border-green-600">
              <Image
                src={pokemon?.sprites?.other?.dream_world?.front_default}
                alt={pokemon?.name}
                styles="w-full h-full p-6"
              />
            </div>
          </div>
        </div>
        <div className="w-1/3 relative flex flex-col justify-evenly">
          <div className="bg-slate-800 p-5">
            <div className="">
              <h1 className="text-md uppercase inline text-white font-nunito">
                Types:
              </h1>
              {pokemon?.types
                ?.map((type) => {
                  return (
                    <p className="inline bg-slate-700 px-2 py-1 rounded-md text-white font-nunito text-md ml-2">
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
              {typeRelations.double_damage_from.join(", ")}
            </p>
            <p>
              <strong>Resistant To:</strong>{" "}
              {typeRelations.half_damage_from.join(", ")}
            </p>
            <p>
              <strong>Immune To:</strong>{" "}
              {typeRelations.no_damage_from.join(", ")}
            </p>
            <p>
              <strong>Strong Against:</strong>{" "}
              {typeRelations.double_damage_to.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Description;
