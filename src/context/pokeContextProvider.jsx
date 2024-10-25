import { useEffect, useReducer, useState} from "react";
import PokeContext from "./pokeContext";
import axios from "axios";
import { reducer } from "./reducer";
const PokeContextProvider = ({children}) => {

    const baseUrl = 'https://pokeapi.co/api/v2';

    const initialState = {
        allPokemons:[],
        pokemon:{},
        PokemonData:[],
        searchResults:[],
        compareList:[],
        loading:false,
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [allPokemonData, setAllPokemonData] = useState([]);

    const fetchAllPokemons = async () => {
        try {
            dispatch({type:"LOADING"})
            const response = await axios.get(`${baseUrl}/pokemon?limit=20`);
            const data = response.data;
            dispatch({
                type:"GET_ALL_POKEMONS", payload:data.results
            })

            const allPokemons = [];
            for(const pokemon of data.results) {
                const response = await axios.get(pokemon.url);
                console.log("response", response.data)
                allPokemons.push(response.data);
            }
            setAllPokemonData(allPokemons)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchAllPokemons();
    },[])


    return(
        <PokeContext.Provider value={{
           ...state,
           allPokemonData,
        }}>
            {children}
        </PokeContext.Provider>
    )
}


export default PokeContextProvider;