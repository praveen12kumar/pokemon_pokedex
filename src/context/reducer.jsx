export const reducer = (state, {type, payload}) => {
    switch(type) {
        case "LOADING":{
            return {...state, loading: true}
        }
        case "GET_POKEMON":{
            return {...state, pokemon:payload, loading:false}
        }
        case "GET_ALL_POKEMONS":{
            return{...state, allPokemons:payload, loading:false}
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

        default:
            return state
        
    }
}

