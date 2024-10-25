import axios from "axios";
import { useEffect } from "react";
function Search(){

    const fetchPokemons = async()=>{
        // try {
        //     const response =await axios.get(`${pokemonRoute}`);
        //     console.log(response.data);
        // } catch (error) {
        //     console.log(error)
        // }
    }

    useEffect(()=>{
        fetchPokemons();
    },[]);




    return(
        <>
        </>
    )
}

export default Search;