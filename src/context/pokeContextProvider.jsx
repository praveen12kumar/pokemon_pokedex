import PokeContext from "./pokeContext";

const PokeContextProvider = ({children}) => {

    return(
        <PokeContext.Provider value={{}}>
            {children}
        </PokeContext.Provider>
    )
}


export default PokeContextProvider;