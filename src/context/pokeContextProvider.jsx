import { useEffect, useReducer, useState} from "react";
import PokeContext from "./pokeContext";
import axios from "axios";
import { reducer } from "./reducer";

const FAVORITES_KEY = "pokedex-favorites";
const MAX_TEAM_SIZE = 6;
const PAGE_SIZE = 20;

const PokeContextProvider = ({children}) => {

    const baseUrl = 'https://pokeapi.co/api/v2';

    const initialState = {
        pokemon:{},
        pokemonDatabase:[],
        searchResults:{},
        randomList:[],
        loading:false,
        locations:{},
        evolutions:{},
        species:{},
        moveDetail:{},
        abilityDetail:{},
        compareA:{},
        compareB:{},
        error:null,
        next:"",
        previous:""
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [allPokemonData, setAllPokemonData] = useState([]);
    const [currentTab, setCurrentTab] = useState("description");
    const [search, setSearch] = useState("");
    const [typeRelations, setTypeRelations] = useState(null);
    const [activeType, setActiveType] = useState("");
    const [favorites, setFavorites] = useState(() => {
        try {
            const stored = localStorage.getItem(FAVORITES_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (pokemonSummary) => {
        setFavorites((prev) => {
            const exists = prev.some((p) => p.name === pokemonSummary.name);
            if (exists) {
                return prev.filter((p) => p.name !== pokemonSummary.name);
            }
            if (prev.length >= MAX_TEAM_SIZE) {
                return prev;
            }
            return [...prev, pokemonSummary];
        });
    }

    const getPokemon = async (name) => {
        try {
            dispatch({type:"LOADING"})
            const response = await axios.get(`${baseUrl}/pokemon/${name}`);
            dispatch({
                type:"GET_POKEMON", payload:response.data
            })
            return response.data;
        } catch (error) {
            dispatch({type:"ERROR", payload:"Couldn't load that Pokémon. Please try again."})
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
            dispatch({type:"ERROR", payload:"Couldn't load the Pokémon list."})
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
            dispatch({type:"ERROR", payload:"Couldn't load random Pokémon."})
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
            dispatch({type:"ERROR", payload:"Couldn't find that Pokémon."})
        }
    }

    const fetchTypeData = async (pokemonName) => {
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

    const getEvaluationData = async (name) => {
        try {
            dispatch({type:"LOADING"})
            const response = await axios.get(`${baseUrl}/pokemon-species/${name}`);
            const evolutionUrl = response?.data?.evolution_chain?.url;
            const evolutionResponse = await axios.get(evolutionUrl);

            // Parse the evolution chain
            const chain = evolutionResponse.data.chain;
            const evolutionChain = [];
            let current = chain;

            // Traverse the evolution chain recursively
            while (current) {
            evolutionChain.push({
              species: current.species.name,
              evolves_to: current.evolves_to.map(evo => evo.species.name),
            });
            current = current.evolves_to[0];
          }

            dispatch({
                type:"GET_EVALUATION_DATA", payload:evolutionChain
            })

        } catch (error) {
            dispatch({type:"ERROR", payload:"Couldn't load evolution data."})
        }
    }

    const getSpecies = async (name) => {
        try {
            dispatch({type:"LOADING"})
            const response = await axios.get(`${baseUrl}/pokemon-species/${name}`);
            dispatch({
                type:"GET_SPECIES", payload:response.data
            })
        } catch (error) {
            dispatch({type:"ERROR", payload:"Couldn't load species data."})
        }
    }

    const getLocationData = async (name) => {

        try {
            dispatch({type:"LOADING"})
            const response = await axios.get(`${baseUrl}/pokemon/${name}`);
            const data = response.data;

            const locate = await axios.get(data.location_area_encounters);

            dispatch({
                type:"GET_LOCATION_DATA", payload:locate.data
            })

        } catch (error) {
            dispatch({type:"ERROR", payload:"Couldn't load location data."})
        }
    }

    // Note: these detail fetches deliberately skip the global LOADING/ERROR
    // dispatch used elsewhere. They back small overlays (modals) opened on top
    // of a page that's already rendered, so toggling the app-wide `loading`
    // flag would unmount and re-flash the entire page behind them. Callers
    // manage their own local loading/error state and catch rejections here.
    const getMoveDetail = async (moveName) => {
        const response = await axios.get(`${baseUrl}/move/${moveName}`);
        dispatch({type:"GET_MOVE_DETAIL", payload:response.data})
    }

    const clearMoveDetail = () => dispatch({type:"CLEAR_MOVE_DETAIL"});

    const getAbilityDetail = async (abilityName) => {
        const response = await axios.get(`${baseUrl}/ability/${abilityName}`);
        dispatch({type:"GET_ABILITY_DETAIL", payload:response.data})
    }

    const clearAbilityDetail = () => dispatch({type:"CLEAR_ABILITY_DETAIL"});

    const getComparePokemon = async (slot, name) => {
        const response = await axios.get(`${baseUrl}/pokemon/${name}`);
        dispatch({type: slot === "A" ? "GET_COMPARE_A" : "GET_COMPARE_B", payload:response.data})
    }

    const getPokemonsPage = async (url) => {
        try {
            dispatch({type:"LOADING"});
            const response = await axios.get(url || `${baseUrl}/pokemon?limit=${PAGE_SIZE}&offset=0`);
            const data = response.data;
            dispatch({type:"SET_PAGE", payload:data});

            const pageData = await Promise.all(data.results.map(p => axios.get(p.url)));
            setAllPokemonData(pageData.map(res => res.data));
        } catch (error) {
            dispatch({type:"ERROR", payload:"Couldn't load Pokémon."})
        }
    }

    const goToNextPage = () => {
        if (state.next) getPokemonsPage(state.next);
    }

    const goToPreviousPage = () => {
        if (state.previous) getPokemonsPage(state.previous);
    }

    const getPokemonsByType = async (type) => {
        setActiveType(type);
        if (!type) {
            getPokemonsPage();
            return;
        }
        try {
            dispatch({type:"LOADING"});
            const response = await axios.get(`${baseUrl}/type/${type}`);
            const list = response.data.pokemon.slice(0, 24).map(p => p.pokemon);
            const results = await Promise.all(list.map(p => axios.get(p.url)));
            setAllPokemonData(results.map(res => res.data));
            dispatch({type:"LOADING_OFF"});
        } catch (error) {
            dispatch({type:"ERROR", payload:"Couldn't filter by type."})
        }
    }

    useEffect(() => {
        getPokemonsPage();
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
           getEvaluationData,
           getSpecies,
           getPokemonsPage,
           goToNextPage,
           goToPreviousPage,
           getPokemonsByType,
           activeType,
           currentTab,
           setCurrentTab,
           favorites,
           toggleFavorite,
           getMoveDetail,
           clearMoveDetail,
           getAbilityDetail,
           clearAbilityDetail,
           getComparePokemon,

        }}>
            {children}
        </PokeContext.Provider>
    )
}


export default PokeContextProvider;
