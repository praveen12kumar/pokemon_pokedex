export const reducer = (state, {type, payload}) => {
    switch(type) {
        case "LOADING":{
            return {...state, loading: true}
        }
        case "GET_POKEMON":{

        }
        case "GET_ALL_POKEMONS":{
            return{...state, allPokemons:payload, loading:false}
        }
        case "GET_ALL_POKEMON_DATA":{

        }
        case "GET_SEARCH":{

        }
        case "GET_POKEMON_DATABASE":{

        }

        default:
            return state
        
    }
}

