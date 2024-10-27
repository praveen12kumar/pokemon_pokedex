export const reducer = (state, {type, payload}) => {
    switch(type) {
        case "LOADING":{
            return {...state, loading: true}
        }
        case "GET_POKEMON":{
            return {...state, pokemon:payload, loading:false}
        }
        case "GET_ALL_POKEMONS":{
            return{...state, allPokemons:payload.results, next:payload.next}
        }
        case "GET_ALL_POKEMONS_DATABASE":{
            return {...state, pokemonDatabase:payload, loading:false}
        }
        case "GET_SEARCH":{
            return {...state, searchResults:payload, loading:false}
        }
        case "GET_RANDOM_POKEMON":{
            return {...state, randomList:[...state.randomList, payload]}
        }
        case "PAGE_DESCRIPTION":{
            return {...state, currentTab:payload}
        }

        case "GET_LOCATION_DATA":{
            return {...state, locations:payload, loading:false}
        }

        case "GET_EVALUATION_DATA":{
            console.log("Payload", payload)
            return {...state, evolutions:payload, loading:false}
        }

        case "NEXT":{
            console.log("payload", payload)
            return {...state, allPokemons:[...state.allPokemons, ...payload.results], next:payload.next, loading:false}
        }

        case "LOADING_OFF":{
            return {...state, loading:false}
        }

        default:
            return state
        
    }
}

