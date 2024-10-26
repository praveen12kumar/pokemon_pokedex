import { useEffect, useReducer, useState} from "react";
import PokeContext from "./pokeContext";
import axios from "axios";
import { reducer } from "./reducer";
const PokeContextProvider = ({children}) => {

    const baseUrl = 'https://pokeapi.co/api/v2';

    const initialState = {
        allPokemons:[],
        pokemon:{},
        pokemonDatabase:[],
        searchResults:{},
        randomList:[],
        loading:false,
        currentTab:"description",
        locations:{},
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [allPokemonData, setAllPokemonData] = useState([]);
    const [search, setSearch] = useState("");
    const [typeRelations, setTypeRelations] = useState(null);

    const fetchAllPokemons = async () => {
        try {
            dispatch({type:"LOADING"})
            const response = await axios.get(`${baseUrl}/pokemon?limit=18`);
            const data = response.data;
            dispatch({
                type:"GET_ALL_POKEMONS", payload:data.results
            })

            const allPokemons = [];
            for(const pokemon of data.results) {
                const response = await axios.get(pokemon.url);
                allPokemons.push(response.data);
            }
            setAllPokemonData(allPokemons)

        } catch (error) {
            console.log(error)
        }
    }

    const getPokemon = async (name) => {
        try {
            dispatch({type:"LOADING"})
            const response = await axios.get(`${baseUrl}/pokemon/${name}`);
            dispatch({
                type:"GET_POKEMON", payload:response.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getPokemonDatabase = async () => {
        try {
            dispatch({type:"LOADING"})
            const response = await axios.get(`${baseUrl}/pokemon?limit=100000&offset=0`);
            const data = response.data; 
            dispatch({
                type:"GET_ALL_POKEMONS_DATABASE", payload:data.results
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getRandomPokemon = async () => {
        try{
            dispatch({type:"LOADING"})
           while(state.randomList.length < 10){
                const randomIndex = Math.floor(Math.random() * 1302);
                const response = await axios.get(`${baseUrl}/pokemon/${randomIndex}`);
                dispatch({
                    type:"GET_RANDOM_POKEMON", payload:response.data
                })
           }
        }
        catch(error){
            console.log(error)
        }
    }

    const getSearchedPokemon = async (searchItem) => {
        
        try {
            dispatch({type:"LOADING"})
            const response = await axios.get(`${baseUrl}/pokemon/${searchItem}`);
            dispatch({
                type:"GET_SEARCH", payload:response.data
            })
        } catch (error) {
            console.log(error);

        }
    }

    const fetchTypeData = async (pokemonName) => {
        console.log("pokemonName", pokemonName);
        
        try {
          const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
          const types = pokemonResponse.data.types.map(typeInfo => typeInfo.type.name);
  
          const typeDataPromises = types.map(type =>
            axios.get(`https://pokeapi.co/api/v2/type/${type}`)
          );
  
          const typeResponses = await Promise.all(typeDataPromises);
          const combinedRelations = {
            double_damage_from: new Set(),
            half_damage_from: new Set(),
            no_damage_from: new Set(),
            double_damage_to: new Set(),
            half_damage_to: new Set(),
            no_damage_to: new Set(),
          };
  
          // Combine the relations for dual types
          typeResponses.forEach(response => {
            const relations = response.data.damage_relations;
            Object.keys(relations).forEach(relationType => {
              relations[relationType].forEach(relation => {
                combinedRelations[relationType].add(relation.name);
              });
            });
          });
  
          setTypeRelations({
            double_damage_from: Array.from(combinedRelations.double_damage_from),
            half_damage_from: Array.from(combinedRelations.half_damage_from),
            no_damage_from: Array.from(combinedRelations.no_damage_from),
            double_damage_to: Array.from(combinedRelations.double_damage_to),
            half_damage_to: Array.from(combinedRelations.half_damage_to),
            no_damage_to: Array.from(combinedRelations.no_damage_to),
          });
        } catch (error) {
          console.error("Error fetching Pokémon type data:", error);
        }
      };
      
    const getLocationData = async (name) => {
        console.log("name", name);
        
        try {
            const response = await axios.get(`${baseUrl}/pokemon/${name}`);
            const data = response.data;
            
            const locate = await axios.get(data.location_area_encounters);
            //console.log("locate",locate.data);

            dispatch({
                type:"GET_LOCATION_DATA", payload:locate.data
            })
            
        } catch (error) {
            
        }
    }

 
    useEffect(() => {
        fetchAllPokemons();
        getPokemonDatabase();
       
    },[])


    return(
        <PokeContext.Provider value={{
           ...state,
           allPokemonData,
           getPokemon,
           getRandomPokemon,
           getSearchedPokemon,
           dispatch,
           search, 
           setSearch,
           typeRelations,
           fetchTypeData,
           getLocationData,

        }}>
            {children}
        </PokeContext.Provider>
    )
}


export default PokeContextProvider;