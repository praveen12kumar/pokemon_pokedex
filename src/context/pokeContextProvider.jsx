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
        currentTab:"description"
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [allPokemonData, setAllPokemonData] = useState([]);
    const [search, setSearch] = useState("");

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

        }}>
            {children}
        </PokeContext.Provider>
    )
}


export default PokeContextProvider;