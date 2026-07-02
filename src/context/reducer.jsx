export const reducer = (state, {type, payload}) => {
    switch(type) {
        case "LOADING":{
            return {...state, loading: true, error: null}
        }
        case "GET_POKEMON":{
            return {...state, pokemon:payload, loading:false}
        }
        case "GET_ALL_POKEMONS_DATABASE":{
            return {...state, pokemonDatabase:payload, loading:false}
        }
        case "GET_SEARCH":{
            return {...state, searchResults:payload, loading:false}
        }
        case "GET_RANDOM_POKEMON":{
            return {...state, randomList:[...state.randomList, payload], loading:false}
        }
        case "PAGE_DESCRIPTION":{
            return {...state, currentTab:payload}
        }

        case "GET_LOCATION_DATA":{
            return {...state, locations:payload, loading:false}
        }

        case "GET_EVALUATION_DATA":{
            return {...state, evolutions:payload, loading:false}
        }

        case "GET_SPECIES":{
            return {...state, species:payload, loading:false}
        }

        case "SET_PAGE":{
            return {...state, next:payload.next, previous:payload.previous, loading:false}
        }

        case "LOADING_OFF":{
            return {...state, loading:false}
        }

        case "CLEAR_SEARCH":{
            return {...state, searchResults:[]}
        }

        case "ERROR":{
            return {...state, error:payload, loading:false}
        }

        case "GET_MOVE_DETAIL":{
            return {...state, moveDetail:payload, loading:false}
        }

        case "CLEAR_MOVE_DETAIL":{
            return {...state, moveDetail:{}}
        }

        case "GET_ABILITY_DETAIL":{
            return {...state, abilityDetail:payload, loading:false}
        }

        case "CLEAR_ABILITY_DETAIL":{
            return {...state, abilityDetail:{}}
        }

        case "GET_COMPARE_A":{
            return {...state, compareA:payload, loading:false}
        }

        case "GET_COMPARE_B":{
            return {...state, compareB:payload, loading:false}
        }

        default:
            return state

    }
}
